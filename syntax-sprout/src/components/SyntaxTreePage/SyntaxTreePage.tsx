import SyntaxTreeCanvas from "../SyntaxTreeCanvas/SyntaxTreeCanvas"
import { useState, useContext } from 'react'
import { TreeNode } from '../TreeNode'
import SyntaxTreeContext from "../SyntaxTreeContext"
import { ThemeProvider } from "../Theme/ThemeContext"
import './SyntaxTreePage.css'
import { SettingsProvider } from "../Settings/SettingsContex"

const SyntaxTreePage = () => {
    const [sentence, setSentence] = useState("")
    const [leafNodes, setLeafNodes] = useState<TreeNode[]>([])
    const [confirmed, setConfirmed] = useState(false)
    const [generateTree, setGenerateTree] = useState(false)
    const {root, setRoot, savedTrees, setSavedTrees} = useContext(SyntaxTreeContext)!

    const sentenceGenerator = () => {
        return (
            <div className="my-[4svh] mx-[4svw] h-[90svh] flex flex-col justify-center items-center
            bg-[url('./assets/vines_waterfall_01.png')] bg-center bg-no-repeat">
                <div className="syntax-tree-page w-full lg:w-1/2 md:w-3/4 bg-gradient-to-tr from-slate-900 via-emerald-900 to-slate-900
                border-solid border-8 border-slate-700">
                    <h3 className="text-2xl">{"Sentence: "}<span className="text-yellow-400">{sentence}</span></h3>
                    {!confirmed ? <div className="flex flex-col items-center">
                    <label className="text-slate-300">Input Sentence: </label> 
                    <textarea
                        className="w-full"
                        onKeyDown={(event) => {if (event.key === 'Enter') handleConfirmSentence()}} 
                        id="sentence-input" 
                        onChange={(e) => setSentence(e.target.value)}  
                    />
                    <button onClick={() => {handleConfirmSentence()}}>Confirm Sentence</button>
                    </div> : 
                    <div className="flex flex-col gap-5">
                        <button onClick={() => {handleClearSentence()}}>Change Sentence</button>
                        <button onClick={() => {generateSyntaxTree()}}>Generate Syntax Tree</button>
                    </div>}
                </div>
            </div>
        )
    }

    const generateSyntaxTree = () => {
        const newRoot = new TreeNode("S")
        newRoot.setChildren(leafNodes)
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