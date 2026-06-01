package generator

import "core:fmt"
import "core:os"
import "core:strings"
import "core:time"
import "core:encoding/json"
import cm "vendor:commonmark"

CM_OPTIONS :: cm.Options{.Smart}
PUBLIC_DIR :: "public"
TEMPLATES_DIR :: "templates"
OPEN_VAR :: "[:"
CLOSE_VAR :: ":]"

Var_Map :: map[string]string

html_render_node :: proc(node: ^cm.Node, entering: bool, sb: ^strings.Builder) {
    node_type := cm.node_get_type(node)
    #partial switch node_type {
    case .Document:
    case .Block_Quote:
        if entering {
            fmt.sbprintln(sb, "<blockquote>")
        } else {
            fmt.sbprintln(sb, "</blockquote>")
        }
    case .Heading:
        level := cm.node_get_heading_level(node)
        if entering {
            fmt.sbprintfln(sb, "<h%d>", level)
        } else {
            fmt.sbprintfln(sb, "</h%d>", level)
        }
    case .Paragraph:
        if entering {
            fmt.sbprintln(sb, "<p>")
        } else {
            fmt.sbprintln(sb, "</p>")
        }
    case .Strong:
        if entering {
            fmt.sbprintln(sb, "<strong>")
        } else {
            fmt.sbprintln(sb, "</strong>")
        }
    case .Emph:
        if entering {
            fmt.sbprintln(sb, "<em>")
        } else {
            fmt.sbprintln(sb, "</em>")
        }
    case .List:
        switch cm.node_get_list_type(node) {
        case .Bullet: fmt.sbprintfln(sb, "<%sul>", entering ? "" : "/")
        case .Ordered: fmt.sbprintfln(sb, "<%sol>", entering ? "" : "/")
        case .None: unreachable()
        }
    case .Item:
        if entering {
            fmt.sbprintln(sb, "<li>")
        } else {
            fmt.sbprintln(sb, "</li>")
        }
    case .Link:
        if entering {
            link := cm.node_get_url(node)
            fmt.sbprintfln(sb, "<a href=\"%s\">", link)
        } else {
            fmt.sbprintln(sb, "</a>")
        }
    case .Code:
        fmt.sbprintfln(sb, "<code>%s</code>", cm.node_get_literal(node))
    case .Code_Block:
        fmt.sbprintfln(sb, "<pre><code>%s</code></pre>", cm.node_get_literal(node))
    case .Text:
        fmt.sbprintln(sb, cm.node_get_literal(node))
    case .Soft_Break:
        fmt.sbprintln(sb, " ")
    case:
        fmt.sbprintln(sb, node_type)
        unimplemented()
    }
}

html_render :: proc(article: string, sb: ^strings.Builder) {
	root := cm.parse_document(raw_data(article), len(article), CM_OPTIONS)
	defer cm.node_free(root)

	iter := cm.iter_new(root)
	defer cm.iter_free(iter)

	for {
		ev_type := cm.iter_next(iter)
        if ev_type == .Done {
            break
        }

        curr := cm.iter_get_node(iter)
        html_render_node(curr, ev_type == .Enter, sb)
	}
}

Post_Metadata :: struct {
    title: string,
    tags: [dynamic]string
}

article_parse_metadata :: proc(article: string) -> (metadata: Post_Metadata, body: string) {
    META_SEP :: "+++"
    o_ind, c_ind := _get_open_close(article, META_SEP, META_SEP)
    meta_str := strings.trim_space(article[o_ind + len(META_SEP):c_ind])
    m_err := json.unmarshal(transmute([]u8)meta_str, &metadata)
    assert(m_err == nil)

    body = strings.trim_space(article[c_ind + len(META_SEP):])
    return
}

template_fill :: proc(path: string, content: string, metadata: Post_Metadata, sb: ^strings.Builder) {
    template := _read_file(path)

    for {
        o_ind, c_ind := _get_open_close(template, OPEN_VAR, CLOSE_VAR)
        if o_ind < 0 do break
        assert(c_ind > 0, fmt.tprintf("missing closing temp var separator: %s", CLOSE_VAR))

        // Copy left of start into sb
        fmt.sbprint(sb, template[:o_ind])

        var_str := template[o_ind + len(OPEN_VAR):c_ind]
        switch var_str {
        case "TITLE":
            fmt.sbprint(sb, metadata.title)
        case "BODY":
            fmt.sbprint(sb, content)
        case "INCLUDE":
            unimplemented()
        case: unimplemented()
        }
        template = template[c_ind + len(CLOSE_VAR):]
    }
    fmt.sbprint(sb, template)
}

template_resolve_vars :: proc(sb: ^strings.Builder, template_content: string, vars: Var_Map) {
    template := template_content
    for {
        o_ind, c_ind := _get_open_close(template, OPEN_VAR, CLOSE_VAR)
        if o_ind < 0 do break
        assert(c_ind > 0, fmt.tprintf("missing closing temp var separator: %s", CLOSE_VAR))

        // Copy left of temp var separator
        fmt.sbprint(sb, template[:o_ind])

        var_str := template[o_ind + len(OPEN_VAR):c_ind]
        if var_str in vars {
            fmt.sbprint(sb, vars[var_str])
        } else {
            fmt.sbprint(sb, template[o_ind:c_ind + len(CLOSE_VAR)])
            fmt.eprintfln("Ignoring %s", var_str)
        }

        template = template[c_ind + len(CLOSE_VAR):]
    }

    // Add remaining template content into sb
    fmt.sbprint(sb, template)
}

template_load_basic :: proc(sb: ^strings.Builder, vars: Var_Map) {
    path := fmt.tprintf("%s/_base.html", TEMPLATES_DIR)
    template_content := _read_file(path)

    fmt.sbprintfln(sb, "<!-- NOTE(mabay): Do not modify directly. Autogenerated file... -->")

    template_resolve_vars(sb, template_content, vars)
}

Page_Kind :: enum {
    Index,
    About,
    Projects,
    Blog,
    NotFound, // 404 page
}

main :: proc() {
    sb := strings.builder_make()
    defer strings.builder_destroy(&sb)

    vars: Var_Map
    // NOTE: Odin's core time lib (for now) only seems to support UTC timezone's
    // TODO: consider getting local time zone (most likely through libc)
    vars["year"] = fmt.tprint(time.year(time.now()))

    template_load_basic(&sb, vars)
    basic_template := strings.clone(strings.to_string(sb))
    strings.builder_reset(&sb)
    fmt.println(basic_template)

    output: map[Page_Kind]struct { html, css: string }
    output[.Index] = {
        html = "index.html",
        css = "index.css",
    }
    output[.About] = {
        html = "about.html",
        css = "about.css",
    }
    output[.NotFound] = {
        html = "404.html",
        css = "404.css",
    }

    for kind, out in output {
        // Copy css page
        _copy_file(
            fmt.tprintf("%s/%s", TEMPLATES_DIR, out.css),
            fmt.tprintf("%s/%s", PUBLIC_DIR, out.css)
        )

        // Produce html page
        vars = {}
        vars["css_path"] = out.css
        #partial switch kind {
        case .Index:
            index_partial := _read_file(fmt.tprintf("%s/_index.partial.html", TEMPLATES_DIR))
            vars["title"] = "@michabay05"
            vars["body"] = index_partial
        case .NotFound:
            nf_partial := _read_file(fmt.tprintf("%s/_404.partial.html", TEMPLATES_DIR))
            vars["title"] = "Page not found"
            vars["body"] = nf_partial
        case .About:
            about_partial := _read_file(fmt.tprintf("%s/_about.partial.html", TEMPLATES_DIR))
            vars["title"] = "About @michabay05"
            vars["body"] = about_partial
        case:
            unimplemented()
        }
        template_resolve_vars(&sb, basic_template, vars)
        _write_file_and_reset(fmt.tprintf("%s/%s", PUBLIC_DIR, out.html), &sb)
    }
}

main2 :: proc() {
    content := _read_file("sample.md")

    metadata, body := article_parse_metadata(content)
    fmt.println(metadata)

    sb := strings.builder_make()
    defer strings.builder_destroy(&sb)
    html_render(body, &sb)
    out := strings.clone(strings.to_string(sb))
    strings.builder_reset(&sb)

    // template_fill("", out, metadata, &sb)

    out = strings.clone(strings.to_string(sb))
    err := os.write_entire_file_from_string("sample.html", out)
    assert(err == nil)
}

_copy_file :: proc(src_path, dest_path: string) {
    content := _read_file(src_path)
    err := os.write_entire_file_from_string(dest_path, content)
    assert(err == nil)
}

_write_file_and_reset :: #force_inline proc(
    path: string, sb: ^strings.Builder, alloc := context.allocator) {
    content := strings.clone(strings.to_string(sb^), alloc)
    err := os.write_entire_file_from_string(path, content)
    assert(err == nil)

    strings.builder_reset(sb)
}

_read_file :: #force_inline proc(path: string, alloc := context.allocator) -> string {
    data, err := os.read_entire_file_from_path(path, alloc)
    assert(err == nil)
    return string(data)
}

_get_open_close :: proc(text, open_pat, close_pat: string) -> (o_ind, c_ind: int) {
    // Set to default values
    o_ind, c_ind = -1, -1

    o_ind = strings.index(text, open_pat)
    if o_ind < 0 do return
    start := o_ind + len(open_pat)
    c_ind = strings.index(text[start:], close_pat)
    if c_ind < 0 do return
    c_ind += start
    return
}

