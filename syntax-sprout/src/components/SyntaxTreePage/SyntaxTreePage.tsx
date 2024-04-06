import SyntaxTreeCanvas from "../SyntaxTreeCanvas/SyntaxTreeCanvas"
import { useState, useContext } from 'react'
import { TreeNode } from '../TreeNode'
import SyntaxTreeContext from "../SyntaxTreeContext/SyntaxTreeContext"


const SyntaxTreePage = () => {

    const [sentence, setSentence] = useState("")
    const [leafNodes, setLeafNodes] = useState<TreeNode[]>([])
    const [confirmed, setConfirmed] = useState(false)
    const [generateTree, setGenerateTree] = useState(false)
    const {root, setRoot} = useContext(SyntaxTreeContext)!

    const sentenceGenerator = () => {
        return (
            <div>
                <label>Input Sentence: </label>
                <input id="sentence-input" onChange={(e) => setSentence(e.target.value)} type="text" />
                {confirmed ? 
                    <>
                    <button onClick={() => {handleClearSentence()}}>Clear Sentence</button> 
                    <div>
                        <h3>{sentence}</h3> 
                        <button onClick={() => {setGenerateTree(true); setRoot(new TreeNode("S", leafNodes))}}>Generate Syntax Tree</button>
                    </div>
                    </>
                    : <button onClick={() => {handleConfirmSentence()}}>Confirm Sentence</button>}
            </div>
        )
    }

    const handleClearSentence = () => {
        (document.getElementById("sentence-input") as HTMLInputElement).value = ""
        setSentence("")
        setConfirmed(false)
    }

    const handleConfirmSentence = () => {
        const words = sentence.split(" ")
        const leaves: TreeNode[] = []
        words.forEach(word => {console.log(word); const leaf = new TreeNode(word, undefined, root); leaves.push(leaf)})
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