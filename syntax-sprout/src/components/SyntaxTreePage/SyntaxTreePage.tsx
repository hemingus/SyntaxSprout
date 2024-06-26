import SyntaxTreeCanvas from "../SyntaxTreeCanvas/SyntaxTreeCanvas"
import { useState, useContext } from 'react'
import { TreeNode } from '../TreeNode'
import SyntaxTreeContext from "../SyntaxTreeContext/SyntaxTreeContext"
import './SyntaxTreePage.css'


const SyntaxTreePage = () => {

    const [sentence, setSentence] = useState("")
    const [leafNodes, setLeafNodes] = useState<TreeNode[]>([])
    const [confirmed, setConfirmed] = useState(false)
    const [generateTree, setGenerateTree] = useState(false)
    const {root, setRoot} = useContext(SyntaxTreeContext)!

    const sentenceGenerator = () => {
        return (
            <div className="syntax-tree-page">
                <h3>{"Sentence: "}<span style={{color: "yellowgreen"}}>{sentence}</span></h3>
                {!confirmed ? 
                <>
                <label>Input Sentence: </label> 
                <input onKeyDown={(event) => {if (event.key === 'Enter') handleConfirmSentence()}} id="sentence-input" onChange={(e) => setSentence(e.target.value)} type="text" />
                </> : <></>}
                {confirmed ? 
                    <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                    <button onClick={() => {handleClearSentence()}}>Change Sentence</button>
                    <button onClick={() => {generateSyntaxTree()}}>Generate Syntax Tree</button>
                    </div>
                    : <button onClick={() => {handleConfirmSentence()}}>Confirm Sentence</button>}
            </div>
        )
    }

    const generateSyntaxTree = () => {
        const newRoot = root.clone()
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
                <SyntaxTreeCanvas/>
        )
    }
    return sentenceGenerator()

}

export default SyntaxTreePage