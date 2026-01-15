import { Link } from "react-router-dom"
import TutorialIcon from "../assets/tutorial.svg?react"
import StartIcon from "../assets/start.svg?react"
import { showcases } from "../data/showcases"
import Showcase from "./Showcase"

const MainMenu : React.FC = () => {

    return (
        <main className="flex flex-col gap-4 bg-gradient-to-b from-black to-slate-700 items-center justify-center p-4">
            <h1 className="text-center text-[clamp(2rem,5vw,3rem)] font-extrabold bg-gradient-to-r from-yellow-700 via-canvas-brown via-canvas-green to-green-400 bg-clip-text text-transparent">
                Welcome to SyntaxSprout
            </h1>
            <p className="text-[clamp(1.2rem,2.5vw,1.5rem)] text-center text-white">
                If you are analyzing sentences and are looking to construct a syntax tree, <br/>
                here is a neat tool to help you accomplish that!
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
                <Link className="no-underline inline-block" to="/tutorial">
                    <div className="flex items-center w-fit px-[clamp(4px,4vw,16px)] py-[clamp(4px,vw,8px)] bg-[rgba(0,0,0,0.5)] gap-4 text-white font-medium text-[clamp(1.2rem,3vw,1.5rem)] rounded-xl border-solid border-[rgba(200,200,200,0.5)] border-[1px] hover:bg-gray-900 hover:border-white">
                        <TutorialIcon className="h-[clamp(2rem,4vw,3rem)] w-auto text-blue-500"/>
                        <p>Tutorial</p>
                    </div>
                </Link>
                <Link className="no-underline inline-block" to="/dashboard">
                    <div className="flex items-center w-fit px-[clamp(4px,4vw,16px)] py-[clamp(4px,vw,8px)] bg-[rgba(0,0,0,0.5)] gap-4 text-white font-medium text-[clamp(1.2rem,3vw,1.5rem)] rounded-xl border-solid border-[rgba(200,200,200,0.5)] border-[1px] hover:bg-gray-900 hover:border-white">
                        <StartIcon className="h-[clamp(2rem,4vw,3rem)] w-auto text-lime-500"/>
                        <p>Start building</p>
                    </div>
                </Link>
            </div>
            <section className="flex flex-wrap justify-center gap-8">
                {showcases.map(sc => {
                    return <Showcase containerStyles="w-[280px]" {...sc} />
                })}
            </section>
        </main>
    )
}

export default MainMenu