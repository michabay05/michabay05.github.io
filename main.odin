package main

import "core:fmt"
import "core:os"
import cm "vendor:commonmark"

CM_OPTIONS :: cm.Options{.Smart}

html_render_node :: proc(node: ^cm.Node, entering: bool) {
    node_type := cm.node_get_type(node)
    #partial switch node_type {
    case .Document:
    case .Block_Quote:
        if entering {
            fmt.println("<blockquote>")
        } else {
            fmt.println("</blockquote>")
        }
    case .Heading:
        level := cm.node_get_heading_level(node)
        if entering {
            fmt.printfln("<h%d>", level)
        } else {
            fmt.printfln("</h%d>", level)
        }
    case .Paragraph:
        if entering {
            fmt.println("<p>")
        } else {
            fmt.println("</p>")
        }
    case .Emph:
        if entering {
            fmt.println("<em>")
        } else {
            fmt.println("</em>")
        }
    case .List:
        if entering {
            fmt.println("<ul>")
        } else {
            fmt.println("</ul>")
        }
    case .Item:
        if entering {
            fmt.println("<li>")
        } else {
            fmt.println("</li>")
        }
    case .Code:
        fmt.println("<code>")
        fmt.println(cm.node_get_literal(node))
        fmt.println("</code>")
    case .Code_Block:
        fmt.println("<pre><code>")
        fmt.println(cm.node_get_literal(node))
        fmt.println("</code></pre>")
    case .Text:
        fmt.println(cm.node_get_literal(node))
    case .Soft_Break:
        fmt.println("<:soft:>")
    case:
        fmt.println(node_type)
        unimplemented()
    }
}

html_render :: proc(article: string) {
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
        html_render_node(curr, ev_type == .Enter)
	}

}

main :: proc() {
    data, err := os.read_entire_file_from_path("test.md", context.allocator)
    assert(err == nil)
    content := string(data)
    html_render(content)
}
