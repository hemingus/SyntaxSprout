import HtmlToImageButton from "./HtmlToImageButton"
import MySyntaxTrees from "./SyntaxTree/MySyntaxTrees"
import TreeSettings from "./SyntaxTree/Settings/TreeSettings"
import ThemeSettings from "./SyntaxTree/Theme/ThemeSettings"
import { useState, useContext } from 'react'
import SyntaxTreeContext from "./SyntaxTree/SyntaxTreeContext"
import SyntaxTreeGenerator from "./SyntaxTree/SyntaxTreeGenerator"
import SyntaxTreeCanvas from "./SyntaxTree/SyntaxTreeCanvas"
import SyntaxTreeName from "./SyntaxTree/SyntaxTreeName"
import CreateNewIcon from "../assets/createnew.svg?react"


const Dashboard = () => {
    const {root, syntaxTreeRef} = useContext(SyntaxTreeContext)!
    const [isGenerating, setIsGenerating] = useState(false)

    const [showSettings, setShowSettings] = useState(false)
    const [showMyTrees, setShowMyTrees] = useState(false)

    function dashboardContent() { 
        return (
        <>
            <div className="flex flex-col justify-center items-center text-white">
                <h1 className="w-full text-center bg-blue-950">Dashboard</h1>
                <div className="w-full flex justify-center flex-col items-center overflow-x-auto relative solid 
                bg-gradient-to-tr from-slate-900 via-gray-950 to-slate-900 gap-4">
                    <div className="flex flex-row justify-center items-center flex-wrap gap-4 mt-4">
                        <button 
                            className="flex-1 whitespace-nowrap flex gap-2 items-center cursor-pointer text-2xl text-white bg-gradient-to-b from-slate-800 to-slate-700 pr-4 py-2 rounded-xl" 
                            onClick={() => setIsGenerating(true)}>
                            <CreateNewIcon className="h-[clamp(2rem,4vw,3rem)] w-auto text-emerald-500"/>
                                Create new
                        </button>
                        <HtmlToImageButton element={syntaxTreeRef.current} imageName={root.meta?.name ? root.meta.name : "(no name)"}/>

                    </div>
                    {showSettings ?
                        <div className="flex flex-col sm:flex-row border-solid border-slate-600 rounded appearGrow">
                            <button className="cursor-pointer p-2 text-xl bg-gradient-to-br from-gray-500 to-slate-700 rounded
                            text-gray-300 border-slate-300 hover:from-gray-400 hover:to-slate-600 hover:text-white"
                                onClick={() => setShowSettings(false)}>
                                Close
                            </button>
                            <TreeSettings />
                            <ThemeSettings />
                        </div> :
                        <button 
                            className="cursor-pointer p-2 text-xl bg-gradient-to-br from-gray-500 to-slate-700 rounded
                            text-white border-slate-300 hover:from-gray-400 hover:to-slate-600" 
                            onClick={() => setShowSettings(true)}>
                                ⚙️ Settings ⚙️
                        </button>
                        }
                    {showMyTrees ? 
                    <div className="flex flex-col border-solid border-slate-600 rounded appearGrow">
                        <button className="cursor-pointer text-xl bg-gradient-to-br from-gray-500 to-slate-700 rounded
                        text-gray-300 border-slate-300 hover:from-gray-400 hover:to-slate-600 hover:text-white"
                        onClick={() => setShowMyTrees(false)}>
                            Close
                        </button>
                        <MySyntaxTrees />
                    </div> :
                    <button 
                        className="cursor-pointer p-2 text-xl bg-gradient-to-br from-gray-500 to-slate-700 rounded mb-4
                        text-white border-slate-300 hover:from-gray-400 hover:to-slate-600" 
                        onClick={() => setShowMyTrees(true)}>
                            🌳 My Trees 🌳
                    </button>}
                    <SyntaxTreeName />
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