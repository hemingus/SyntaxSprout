import HtmlToImageButton from "./HtmlToImageButton"
import MySyntaxTrees from "./SyntaxTree/MySyntaxTrees"
import TreeSettings from "./SyntaxTree/Settings/TreeSettings"
import ThemeSettings from "./SyntaxTree/Theme/ThemeSettings"
import { useState, useRef, useContext } from 'react'
import SyntaxTreeContext from "./SyntaxTree/SyntaxTreeContext"
import SyntaxTreeGenerator from "./SyntaxTree/SyntaxTreeGenerator"
import SyntaxTreeCanvas from "./SyntaxTree/SyntaxTreeCanvas"


const Dashboard = () => {
    const {root} = useContext(SyntaxTreeContext)!
    const [isGenerating, setIsGenerating] = useState(false)
    const syntaxTreeRef = useRef<HTMLDivElement>(null);
    
    function dashboardContent() { 
        return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center flex-col items-center overflow-x-auto relative w-full solid bg-gradient-to-tr from-slate-900 via-gray-950 to-slate-900">
                    <div className="flex flex-row justify-center items-center">
                        <div className="flex flex-col">
                            <button 
                                className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500" 
                                onClick={() => setIsGenerating(true)}>
                                    Create new
                            </button>
                            <HtmlToImageButton element={syntaxTreeRef.current} imageName={root.meta?.name ? root.meta.name : "(no name)"}/>
                        </div>
                        <ThemeSettings />
                        <TreeSettings />
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