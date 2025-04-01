import { JSX } from "react"

export default function App(): JSX.Element {
    return (
        <div className="">
            <nav className="bg-primary-clr">
                <div className="mx-auto px-3 py-5 flex justify-between max-w-3xl">
                    <h1 className="text-lg font-bold text-light-clr">@michabay05</h1>
                    <div className="flex">
                        <a href="https://github.com/michabay05">
                            <GithubIcon twclasses="text-light-clr mx-6"/>
                        </a>
                        <a href="https://www.linkedin.com/in/michael-abayneh-953570343/">
                            <LinkedInIcon twclasses="text-light-clr"/>
                        </a>
                    </div>
                    {/* TODO add learn more btn here */}
                </div>
            </nav>

            <main className="flex flex-col py-8 max-w-3xl mx-auto h-">
                <h2 className="text-xl text-center max-w-lg mx-auto">
                    Hi! My name is Michael Abayneh (aka. michabay05).
                    <br></br>
                    I primarily enjoy programming recreationally.
                </h2>
                <div className="flex w-md mx-auto mt-5 justify-evenly">
                    <StyledButton filled>
                        <a>Learn more</a>
                    </StyledButton>
                </div>
            </main>

            <section className="bg-primary-clr text-light-clr py-8">
                <h3 className="text-center text-2xl font-bold mb-7">
                    Project Overview
                </h3>
                <div className="flex justify-evenly">
                    <ProjectCard
                        title="HazeChess"
                        textForLink="michabay05/haze-chess"
                        link="https://github.com/michabay05/haze-chess"
                        desc="High-performance calculations, deep analysis, and optimal play (~1690 elo on CCRL)."
                    />
                    <ProjectCard
                        title="SnipnSave"
                        textForLink="michabay05/snip-n-save"
                        link="https://github.com/michabay05/snip-n-save"
                        desc="Simple-to-use chrome extension that snips and saves your curious internet journey."
                    />
                </div>
            </section>

            <section>
                <h3>Blogs</h3>
                <p>Coming soon!</p>
            </section>
        </div>
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
        <div className="border-3 border-light-clr rounded-lg h-auto w-2/5 px-6 text-light-clr flex flex-col">
            <h4 className="mt-4 font-bold text-2xl text-center">
                {props.title}
            </h4>

            <p className="text-sm underline text-center">
                <a href={props.link}>
                    {props.textForLink}
                </a>
            </p>

            <p className="text-center text-md my-4 text-light-clr">
                {props.desc}
            </p>

            <StyledButton extraTWclasses="mb-4">
                <a href={props.link} className="flex justify-center mx-auto">
                    <p className="mr-4">Explore</p>
                    <VisitLink />
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
    twclasses: string;
}

// Source: https://lucide.dev/icons/github
function GithubIcon(props: IconProp): JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={props.twclasses}>
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
            <path d="M9 18c-4.51 2-5-2-7-2"/>
        </svg>
    )
}

// TODO: this icon is deprecated; find an alternative
// Source: https://lucide.dev/icons/linkedin
function LinkedInIcon(props: IconProp): JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={props.twclasses}>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect width="4" height="12" x="2" y="9"/>
            <circle cx="4" cy="4" r="2"/>
        </svg>
    )
}

function VisitLink(): JSX.Element {
    // Source: https://lucide.dev/icons/external-link
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="">
            <path d="M15 3h6v6"/>
            <path d="M10 14 21 3"/>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        </svg>
    );
}
