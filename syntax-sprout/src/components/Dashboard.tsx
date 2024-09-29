import HtmlToImageButton from "./HtmlToImageButton"
import MySyntaxTrees from "./SyntaxTree/MySyntaxTrees"
import TreeSettings from "./SyntaxTree/Settings/TreeSettings"
import ThemeSettings from "./SyntaxTree/Theme/ThemeSettings"
import { useState, useContext } from 'react'
import SyntaxTreeContext from "./SyntaxTree/SyntaxTreeContext"
import SyntaxTreeGenerator from "./SyntaxTree/SyntaxTreeGenerator"
import SyntaxTreeCanvas from "./SyntaxTree/SyntaxTreeCanvas"


const Dashboard = () => {
    const {root, syntaxTreeRef} = useContext(SyntaxTreeContext)!
    const [isGenerating, setIsGenerating] = useState(false)
    
    function dashboardContent() { 
        return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="w-full flex justify-center flex-col items-center overflow-x-auto relative solid 
                bg-gradient-to-tr from-slate-900 via-gray-950 to-slate-900">
                    <div className="flex flex-row justify-center items-center flex-wrap">
                        <div className="flex flex-col gap-4">
                            <button 
                                className="cursor-pointer p-4 text-xl bg-gradient-to-br from-emerald-500 to-slate-700 rounded-[2rem]
                                text-white border-slate-300 hover:shadow-[0px_0px_10px_5px_greenyellow]" 
                                onClick={() => setIsGenerating(true)}>
                                    🎇 Create new 🎇
                            </button>
                            <HtmlToImageButton element={syntaxTreeRef.current} imageName={root.meta?.name ? root.meta.name : "(no name)"}/>
                        </div>
                        <div className="flex flex-row border-solid border-slate-400 rounded-2xl p-1">
                            <TreeSettings />
                            <ThemeSettings />
                            
                        </div>
                    </div>
                    <MySyntaxTrees />
                </div>
                
            </div>
        <SyntaxTreeCanvas />
        </>
        )
    }

    const content = () => {
        return isGenerating ? <SyntaxTreeGenerator /> : dashboardContent()
    }

    return (
        <div>
            {content()}
        </div>
    )
}

export default Dashboard