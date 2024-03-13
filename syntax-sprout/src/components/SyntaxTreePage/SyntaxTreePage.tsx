import SyntaxTreeCanvas from "../SyntaxTreeCanvas/SyntaxTreeCanvas"
import { useState, useEffect } from 'react'
import { TreeNode } from '../SyntaxTreeNode/SyntaxTreeNode'

const SyntaxTreePage = () => {

    const [sentence, setSentence] = useState("")
    const [leafNodes, setLeafNodes] = useState<TreeNode[]>([])
    const [confirmed, setConfirmed] = useState(false)
    const [generateTree, setGenerateTree] = useState(false)
    const [rootNode, setRootNode] = useState<TreeNode>({label: "S"})

    const sentenceGenerator = () => {
        return (
            <div>
                <label>Input Sentence: </label>
                <input onChange={(e) => setSentence(e.target.value)} type="text" />
                <button onClick={() => {handleConfirmSentence()}}>Confirm Sentence</button>
                {confirmed ? 
                    <div> 
                        <h3>{sentence}</h3> 
                        <button onClick={() => {setGenerateTree(true); setRootNode({label: "S", children: leafNodes})}}>Generate Syntax Tree</button>
                    </div>
                    : <></>}
            </div>
        )
    }

    const handleConfirmSentence = () => {
        const words = sentence.split(" ")
        const leaves: TreeNode[] = []
        words.forEach(word => {console.log(word); const leaf = {label: word, parent: rootNode}; leaves.push(leaf)})
        setLeafNodes(leaves)
        setConfirmed(!confirmed)
    }
    if (generateTree) {
        return (
            <SyntaxTreeCanvas root={rootNode}/>
        )
    }
    return sentenceGenerator()

}

export default SyntaxTreePage