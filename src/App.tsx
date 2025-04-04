import { JSX } from "react"

export default function App(): JSX.Element {
    return (
        <>
            <nav className="bg-primary-clr">
                <div className="mx-auto px-7 py-5 flex justify-between">
                    <h1 className="text-lg font-bold font-figtree text-light-clr">@michabay05</h1>
                    <div className="flex min-w-1/4 justify-evenly">
                        <a href="https://github.com/michabay05">
                            <GithubIcon twclasses="text-light-clr"/>
                        </a>
                        <a href="https://www.linkedin.com/in/michael-abayneh-953570343/">
                            <LinkedInIcon twclasses="fill-light-clr"/>
                        </a>
                    </div>
                </div>
            </nav>

            <main className="flex flex-col px-8 py-36 max-w-3xl mx-auto">
                <h2 className="text-xl text-center max-w-lg mx-auto">
                    Hi! My name is Michael Abayneh (aka. michabay05).
                    I primarily enjoy programming recreationally.
                </h2>
                <div className="flex max-w-md mx-auto mt-5 justify-evenly">
                    <StyledButton filled>
                        <a>Connect</a>
                    </StyledButton>
                </div>
            </main>

            <section className="bg-primary-clr text-light-clr py-8">
                <div className="mx-auto md:max-w-xl lg:max-w-3xl">
                    <h3 className="text-center text-2xl font-bold mb-7">
                        Recent Projects
                    </h3>
                    <div className="flex flex-col lg:flex-row gap-y-6 lg:gap-x-6 justify-center px-8">
                        <ProjectCard
                            title="HazeChess"
                            textForLink="michabay05/haze-chess"
                            link="https://github.com/michabay05/haze-chess"
                            desc="High-performance calculations, deep analysis, and optimal play (~1690 elo on CCRL)."
                        />
                        <ProjectCard
                            title="Snip and Save"
                            textForLink="michabay05/snip-n-save"
                            link="https://github.com/michabay05/snip-n-save"
                            desc="Simple-to-use chrome extension that snips and saves your curious internet journey."
                        />
                    </div>
                    <p className="text-center mt-6">
                        Find more on <a className="underline" href="https://github.com/michabay05">
                            Github
                        </a>
                    </p>
                </div>
            </section>

            <section className="text-dark-clr py-8">
                <h3 className="text-center text-2xl text-primary-clr font-bold mb-7">
                    Blogs
                </h3>
                <p className="text-lg text-center">
                    Hopefully, coming soon!
                </p>
            </section>
        </>
    )
}

interface ProjectCardProp {
    title: string;
    textForLink: string;
    link: string;
    desc: string;
}

function ProjectCard(props: ProjectCardProp): JSX.Element {
    return (
        <div className="border-3 border-light-clr rounded-lg px-6 text-light-clr flex flex-col">
            <h4 className="mt-4 font-bold text-xl text-center wrap-anywhere">
                {props.title}
            </h4>

            <p className="text-sm underline text-center wrap-anywhere">
                <a href={props.link}>
                    {props.textForLink}
                </a>
            </p>

            <p className="text-center text-md my-4 text-light-clr">
                {props.desc}
            </p>

            <StyledButton extraTWclasses="mb-4">
                <a href={props.link} className="flex justify-center mx-auto">
                    <p className="mr-3">Explore</p>
                    <RedirectIcon />
                </a>
            </StyledButton>
        </div>
    );
}

interface ButtonProp {
    children: JSX.Element;
    filled?: boolean;
    extraTWclasses?: string;
}

function StyledButton(props: ButtonProp): JSX.Element {
    const isFilled = props.filled ? props.filled : false;
    const filledBtn = "bg-primary-clr text-light-clr border-3 border-primary-clr";
    const strokedBtn = "bg-light-clr text-primary-clr border-3 border-primary-clr";
    const colorSpecifics = isFilled ? filledBtn : strokedBtn;

    return (
        <button className={`${colorSpecifics} font-bold px-7 py-2 rounded-md hover:cursor-pointer ${props.extraTWclasses}`}>
            {props.children}
        </button>
    );
}

interface IconProp {
    twclasses?: string;
}

// Source: https://icons.getbootstrap.com/icons/github/
function GithubIcon(props: IconProp): JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            fill="currentColor" viewBox="0 0 16 16" className={props.twclasses}>
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
        </svg>
    )
}

// Source: https://icons.getbootstrap.com/icons/linkedin/
function LinkedInIcon(props: IconProp): JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            fill="currentColor" viewBox="0 0 16 16" className={props.twclasses}>
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
        </svg>
    );
}

// Source: https://icons.getbootstrap.com/icons/chevron-right/
function RedirectIcon(props: IconProp): JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            fill="currentColor" viewBox="0 0 16 16" className={props.twclasses}>
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
        </svg>
    );
}
