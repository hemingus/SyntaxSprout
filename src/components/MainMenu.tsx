import Dashboard from "./Dashboard"
import { useState } from 'react'

const MainMenu : React.FC = () => {
    const [showSyntaxTree, setShowSyntaxTree] = useState(false)
    
    if (showSyntaxTree) {
        return (
            <Dashboard />
        )
    }

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
                <button 
                    className="text-xl bg-slate-700 text-slate-300 cursor-pointer hover:text-white hover:bg-slate-600" 
                    onClick={() => setShowSyntaxTree(true)}>
                        Get started ⏵
                </button>
            </div>
        </div>
    )
}

export default MainMenu