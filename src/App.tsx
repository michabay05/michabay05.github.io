import { JSX } from "react"

// Use figtree font
// Source: https://fonts.google.com/specimen/Figtree

export default function App(): JSX.Element {
    return (
        <>
            <nav className="bg-primary-clr">
                <div className="mx-auto px-7 py-5 flex justify-between">
                    <h1 className="text-lg font-bold font-figtree text-light-clr">@michabay05</h1>
                    <div className="flex min-w-1/5 justify-around">
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
                <div className="container mx-auto">
                    <h3 className="text-center text-2xl font-bold mb-7">
                        Recent Projects
                    </h3>
                    <div className="flex flex-col gap-y-6 justify-center px-8">
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
                <a href={props.link} className="flex justify-around mx-auto">
                    <p className="">Explore</p>
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

// Source: https://www.svgrepo.com/svg/108614/linkedin
function LinkedInIcon(props: IconProp): JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24"
            width="24" version="1.1" id="Layer_1" viewBox="0 0 310 310"
            className={props.twclasses}>
                <g id="XMLID_801_">
                    <path id="XMLID_802_" d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73   C77.16,101.969,74.922,99.73,72.16,99.73z"/>
                    <path id="XMLID_803_" d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4   c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"/>
                    <path id="XMLID_804_" d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599   c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319   c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995   C310,145.43,300.549,94.761,230.454,94.761z"/>
                </g>
        </svg>
    );
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
