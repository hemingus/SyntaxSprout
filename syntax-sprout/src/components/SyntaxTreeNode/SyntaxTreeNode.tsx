import './SyntaxTreeNode.css'
import { useState } from 'react'

export type TreeNode = { 
    label: string,
    children?: TreeNode[],
    parent?: TreeNode
}

const SyntaxTreeNode: React.FC<TreeNode> = (nodeData) => {
    const [newText, setNewText] = useState("") 
    const [editing, setEditing] = useState(false)

    function updateNodeLabel() {
        nodeData.label.replace(nodeData.label, newText)
        setEditing(false)
    }

    const returnChildren = () => {
        const childrenToReturn = nodeData.children!

        return (
            <div className="nodeBlock-container">
                {childrenToReturn.map((child, index) => ( 
                    <SyntaxTreeNode key={index+child.label} {...child} />
                ))}
            </div>
        )
    }

    if (nodeData.children) return (
        <div className="nodeBlock-container-vertical">
            
            {editing ? <input type="text" onChange={(e) => setNewText(e.currentTarget.value)} onBlur={() => updateNodeLabel()}/> 
            : <span id={nodeData.label} onClick={() => setEditing(true)} className="nodeBlock">{nodeData.label}</span>}
            {nodeData.children ? returnChildren() : <></>}
        </div>
    ) 
    else return (
        <div className="wordBlock-container">
            <span id={nodeData.label} className="wordBlock">{nodeData.label}</span>
    
        </div>
    )
}

export default SyntaxTreeNode