import SyntaxTreeCanvas from "../SyntaxTreeCanvas/SyntaxTreeCanvas"
import { useState, useContext } from 'react'
import { TreeNode } from '../TreeNode'
import SyntaxTreeContext from "../SyntaxTreeContext"
import { ThemeProvider } from "../Theme/ThemeContext"
import './SyntaxTreePage.css'



const SyntaxTreePage = () => {

    const [sentence, setSentence] = useState("")
    const [leafNodes, setLeafNodes] = useState<TreeNode[]>([])
    const [confirmed, setConfirmed] = useState(false)
    const [generateTree, setGenerateTree] = useState(false)
    const {root, setRoot} = useContext(SyntaxTreeContext)!

    const sentenceGenerator = () => {
        return (
            <div className="syntax-tree-page w-full lg:w-1/2 md:w-3/4">
                <h3 className="w-full">{"Sentence: "}<span className="text-yellow-400">{sentence}</span></h3>
                {!confirmed ? <div className="flex flex-col items-center">
                <label>Input Sentence: </label> 
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
        )
    }

    const generateSyntaxTree = () => {
        const newRoot = new TreeNode("S")
        newRoot.setChildren(leafNodes)
        setRoot(newRoot)
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
            <ThemeProvider>
                <SyntaxTreeCanvas/>
            </ThemeProvider>
        )
    }
    return sentenceGenerator()

}

export default SyntaxTreePage