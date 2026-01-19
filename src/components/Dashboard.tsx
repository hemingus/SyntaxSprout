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
import SettingsIcon from "../assets/settings.svg?react"
import MyTreesIcon from "../assets/mytrees.svg?react"


const Dashboard = () => {
    const {root, syntaxTreeRef} = useContext(SyntaxTreeContext)!
    const [isGenerating, setIsGenerating] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [showMyTrees, setShowMyTrees] = useState(false)

    return (
        <>
            {isGenerating && <SyntaxTreeGenerator isVisible={true} onCancel={() => setIsGenerating(false)}/>}
            <div className="flex flex-col justify-center items-center text-white">
                <h1 className="w-full text-center bg-blue-950">Dashboard</h1>
                <div className="flex flex-col w-full items-center relative solid 
                bg-gradient-to-tr from-slate-900 via-gray-950 to-slate-900 gap-4">
                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <button 
                            className="whitespace-nowrap flex gap-2 items-center cursor-pointer text-2xl text-white 
                            bg-gradient-to-b from-slate-800 to-slate-700 pr-4 py-2 rounded-xl
                            hover:bg-gradient-to-b hover:from-slate-900 hover:to-blue-950" 
                            onClick={() => setIsGenerating(true)}>
                            <CreateNewIcon className="h-[clamp(2rem,4vw,3rem)] w-auto text-emerald-400"/>
                                Create new
                        </button>
                        <HtmlToImageButton element={syntaxTreeRef.current} imageName={root.meta?.name ? root.meta.name : "(no name)"}/>

                    </div>
                    
                        {showSettings ?
                            <div className="flex flex-col  appearGrow">
                                <button className="cursor-pointer text-xl bg-gradient-to-br from-gray-900 to-slate-600
                                text-gray-300 border-slate-600 
                                hover:text-white hover:border-slate-500"
                                    onClick={() => setShowSettings(false)}>
                                    ◀ Close ▶
                                </button>
                                <div className="flex flex-col xs:flex-row">
                                    <TreeSettings />
                                    <ThemeSettings />
                                </div>
                            </div> :
                            <button
                                className="w-[160px] whitespace-nowrap flex gap-2 items-center justify-between cursor-pointer text-xl text-white 
                                bg-gradient-to-b from-slate-800 to-slate-700 p-1 rounded-xl
                                hover:bg-gradient-to-b hover:from-slate-900 hover:to-blue-950"
                                onClick={() => setShowSettings(true)}>
                                <SettingsIcon className="h-[clamp(1.5rem,3vw,2rem)] w-auto text-slate-400" />
                                    Settings
                                <SettingsIcon className="h-[clamp(1.5rem,3vw,2rem)] w-auto text-slate-400" />
                            </button>
                            }
                        {showMyTrees ?
                        <div className="flex flex-col rounded appearGrow">
                            <button className="cursor-pointer text-xl bg-gradient-to-br from-gray-900 to-slate-600
                            text-gray-300 border-slate-600 
                            hover:text-white hover:border-slate-500"
                            onClick={() => setShowMyTrees(false)}>
                                ◀ Close ▶
                            </button>
                            <MySyntaxTrees />
                        </div> :
                        <button
                            className="w-[160px] whitespace-nowrap flex gap-2 items-center justify-between cursor-pointer text-xl text-white 
                            bg-gradient-to-b from-slate-800 to-slate-700 p-1 rounded-xl
                            hover:bg-gradient-to-b hover:from-slate-900 hover:to-blue-950"
                            onClick={() => setShowMyTrees(true)}>
                            <MyTreesIcon className="h-[clamp(1.5rem,3vw,2rem)] w-auto text-green-600"/>
                                My Trees
                            <MyTreesIcon className="h-[clamp(1.5rem,3vw,2rem)] w-auto text-green-600"/>
                        </button>}
                    <SyntaxTreeName />
                </div>
                
            </div>
        <SyntaxTreeCanvas />
        </>
    )
}

export default Dashboard