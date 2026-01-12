import { Link } from "react-router-dom"
import TutorialIcon from "../../public/assets/icons/tutorial.svg?react"
import StartIcon from "../../public/assets/icons/start.svg?react"

const MainMenu : React.FC = () => {

    return (
        <main className="flex flex-col items-center justify-center">
            <h1 className="text-[3rem] font-extrabold bg-gradient-to-r from-canvas-brown to-canvas-green bg-clip-text text-transparent">Welcome to Syntax Sprout</h1>
            <p className="text-[1.5rem] text-center text-white">
                If you are analyzing sentences and are looking to construct a syntax tree, <br/>
                here is a neat tool to help you accomplish that!
            </p>
            <div className="flex gap-8">
                <Link className="no-underline inline-block" to="/tutorial">
                    <div className="flex items-center w-fit px-8 py-2 bg-[rgba(0,0,0,0.5)] gap-4 text-white font-medium text-2xl rounded-xl border-solid border-[rgba(200,200,200,0.5)] border-[1px] hover:bg-gray-900 hover:border-white">
                        <TutorialIcon className="h-12 w-12 text-blue-500"/>
                        <p>Tutorial</p>
                    </div>
                </Link>
                <Link className="no-underline" to="/dashboard">
                    <div className="flex items-center w-fit px-8 py-2 bg-[rgba(0,0,0,0.5)] gap-4 text-white font-medium text-2xl rounded-xl border-solid border-[rgba(200,200,200,0.5)] border-[1px] hover:bg-gray-900 hover:border-white">
                        <StartIcon className="h-12 w-12 text-lime-500"/>
                        <p>Start building</p>
                    </div>
                </Link>
            </div>
            <section>
                div
            </section>
        </main>
    )
}

export default MainMenu