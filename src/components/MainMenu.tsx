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
        bg-[url('./assets/vines_waterfall_02.png')] bg-center bg-no-repeat">
            <div className="flex flex-col justify-center items-center p-8 bg-gradient-to-tr from-slate-900 via-emerald-900 to-slate-900
            border-solid border-8 border-slate-700">
                <p className="text-white text-2xl">
                    Welcome to Syntax Sprout!
                    <br/> If you are analyzing sentences and are looking to construct a syntax tree, 
                    <br/> here is a neat tool to help you accomplish that!
                </p>
                <button 
                    className="text-xl bg-slate-700 text-slate-300 cursor-pointer hover:text-white" 
                    onClick={() => setShowSyntaxTree(true)}>
                        Get started ⏵
                </button>
            </div>
        </div>
    )
}

export default MainMenu