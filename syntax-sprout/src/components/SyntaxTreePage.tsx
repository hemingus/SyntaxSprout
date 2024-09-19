import SyntaxTreeCanvas from "./SyntaxTreeCanvas/SyntaxTreeCanvas"
import { useState, useContext } from 'react'
import { TreeNode } from './TreeNode'
import SyntaxTreeContext from "./SyntaxTreeContext"
import { ThemeProvider } from "./Theme/ThemeContext"
import { SettingsProvider } from "./Settings/SettingsContex"

const SyntaxTreePage = () => {
    const [sentence, setSentence] = useState("")
    const [treeName, setTreeName] = useState<string>("")
    const [leafNodes, setLeafNodes] = useState<TreeNode[]>([])
    const [confirmed, setConfirmed] = useState(false)
    const [generateTree, setGenerateTree] = useState(false)
    const {root, setRoot, savedTrees, setSavedTrees} = useContext(SyntaxTreeContext)!

    const sentenceGenerator = () => {
        return (
            <div className="my-[4svh] mx-[4svw] h-[90svh] flex flex-col justify-center items-center
            bg-[url('./assets/vines_waterfall_01.png')] bg-center bg-no-repeat">
                <div className="flex flex-col justify-center items-center p-5 gap-5 w-fit relative 
                lg:w-1/2 md:w-3/4 bg-gradient-to-tr from-slate-900 via-emerald-900 to-slate-900
                border-solid border-8 border-slate-700">
                    {!confirmed ? <>
                    <label className="text-xl text-slate-300 font-black">Input Name: </label>
                    <input className="w-full font-sans text-xl text-white bg-black" 
                    onChange={(e) => setTreeName(e.target.value)}/> </> :
                    <h2 className="w-full font-sans text-2xl text-white bg-black">Name: <span className="text-green-500">{treeName}</span></h2>}
                    <h3 className="w-full p-1 text-white bg-gray-600 text-2xl">{"Sentence: "}<span className="text-yellow-400">{sentence}</span></h3>
                    {!confirmed ? <>
                    <label className="text-xl text-slate-300 font-black">Input Sentence: </label> 
                    <input
                        autoCorrect="off"
                        className="w-full font-sans text-xl text-white bg-black"
                        onKeyDown={(event) => {if (event.key === 'Enter') handleConfirmSentence()}} 
                        id="sentence-input" 
                        onChange={(e) => setSentence(e.target.value)}  
                    />
                    <button 
                    className="text-xl text-gray-300 bg-slate-800 cursor-pointer hover:text-lime-400"
                    onClick={() => {handleConfirmSentence()}}>
                        Confirm Sentence</button>
                    </> : 
                    <div className="flex flex-col gap-5">
                        <button className="text-xl text-gray-300 bg-slate-800 cursor-pointer hover:text-lime-400" 
                        onClick={() => {handleClearSentence()}}>Change Sentence</button>
                        <button className="text-xl text-gray-300 bg-slate-800 cursor-pointer hover:text-lime-400"
                        onClick={() => {generateSyntaxTree()}}>Generate Syntax Tree</button>
                    </div>}
                </div>
            </div>
        )
    }

    const generateSyntaxTree = () => {
        const newRoot = new TreeNode("S")
        newRoot.setChildren(leafNodes)
        newRoot.setMeta({name: treeName})
        setRoot(newRoot)
        setSavedTrees([...savedTrees, newRoot])
        setGenerateTree(true)
    }

    const handleClearSentence = () => {
        setSentence("")
        setConfirmed(false)
    }

    const handleConfirmSentence = () => {
        const words = sentence.split(" ")
        const leaves: TreeNode[] = []
        words.forEach(word => {const leaf = new TreeNode(word, undefined, root); leaves.push(leaf)})
        setLeafNodes(leaves)
        setConfirmed(true)
    }
    
    if (generateTree) {
        return (
            <SettingsProvider>
                <ThemeProvider>
                    <SyntaxTreeCanvas/>
                </ThemeProvider>
            </SettingsProvider>
        )
    }
    return sentenceGenerator()

}

export default SyntaxTreePage