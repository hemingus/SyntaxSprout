import { Link } from "react-router-dom"

const MainMenu : React.FC = () => {

    return (
        <div className="my-[4svh] mx-[4svw] h-[90svh] flex flex-col justify-center items-center
        bg-[url('/assets/vines_waterfall_02.png')] bg-center bg-no-repeat">
            <div className="flex flex-col justify-center items-center p-8 bg-gradient-to-tr from-green-700 via-emerald-900 to-green-700
            border-solid border-8 rounded-xl border-canvas-green">
                <p className="text-white text-2xl">
                    <span className="text-3xl text-canvas-brown"> Welcome to Syntax Sprout! </span>
                    <br/> If you are analyzing sentences and are looking to construct a syntax tree, 
                    <br/> here is a neat tool to help you accomplish that!
                </p>
                <div className="flex flex-row gap-10">
                <Link 
                    className="p-1 no-underline border-solid rounded-lg border-black text-xl bg-slate-700 text-slate-300 cursor-pointer 
                    hover:text-white hover:bg-slate-600"
                    to="/tutorial">
                        Tutorial
                </Link>
                <Link 
                    className="p-1 no-underline border-solid rounded-lg border-black text-xl bg-slate-700 text-slate-300 cursor-pointer 
                    hover:text-white hover:bg-slate-600" 
                    to="/dashboard">
                        Get started ⏵
                </Link>
                </div>
            </div>
        </div>
    )
}

export default MainMenu