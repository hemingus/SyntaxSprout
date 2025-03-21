import { Link } from "react-router-dom"

const MainMenu : React.FC = () => {

    return (
        <div className="h-[90svh] self-center flex flex-col justify-center items-center
        bg-[url('/assets/vines_waterfall_02.png')] bg-center bg-no-repeat bg-cover rounded-3xl">
            <div className="w-[80%] flex flex-col justify-center items-center p-8 bg-gradient-to-tr from-green-700 via-emerald-900 to-green-700
            border-solid border-4 border-gray-800 rounded-xl">
                <p className="text-white text-2xl">
                    <span className="text-3xl text-amber-300"> Welcome to Syntax Sprout! </span>
                    <br/> If you are analyzing sentences and are looking to construct a syntax tree, 
                    <br/> here is a neat tool to help you accomplish that!
                </p>
                <div className="flex flex-row gap-10">
                <Link 
                    className="p-1 no-underline text-xl border-solid border-2 border-transparent bg-gradient-to-tr
                     from-slate-700 via-slate-900 to-slate-700 text-slate-300 cursor-pointer 
                    hover:text-white hover:bg-slate-600" 
                    to="/tutorial">
                        Tutorial
                </Link>
                <Link 
                    className="p-1 no-underline text-xl border-solid border-2 border-transparent bg-gradient-to-tr
                     from-slate-700 via-slate-900 to-slate-700 text-slate-300 cursor-pointer 
                    hover:text-white hover:bg-slate-600" 
                    to="/dashboard">
                        Get started ➠
                </Link>
                </div>
            </div>
        </div>
    )
}

export default MainMenu