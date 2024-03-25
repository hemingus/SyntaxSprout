import SyntaxTreeCanvas from "../SyntaxTreeCanvas/SyntaxTreeCanvas"
import { useState } from 'react'
import { TreeNode } from '../SyntaxTreeNode/SyntaxTreeNode'
import { nanoid } from 'nanoid'

const SyntaxTreePage = () => {

    const [sentence, setSentence] = useState("")
    const [leafNodes, setLeafNodes] = useState<TreeNode[]>([])
    const [confirmed, setConfirmed] = useState(false)
    const [generateTree, setGenerateTree] = useState(false)
    const [rootNode, setRootNode] = useState<TreeNode>({id: "root", label: "S"})

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
                        <button onClick={() => {setGenerateTree(true); setRootNode({id: "root-node", label: "S", children: leafNodes})}}>Generate Syntax Tree</button>
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
        words.forEach(word => {console.log(word); const leaf = {id: nanoid(), label: word, parent: rootNode}; leaves.push(leaf)})
        setLeafNodes(leaves)
        setConfirmed(true)
    }
    
    if (generateTree) {
        return (
            <SyntaxTreeCanvas root={rootNode}/>
        )
    }
    return sentenceGenerator()

}

export default SyntaxTreePage