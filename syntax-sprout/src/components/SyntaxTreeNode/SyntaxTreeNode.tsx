import './SyntaxTreeNode.css'
import { useState } from 'react'

export type TreeNode = {
    id: string, 
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
                {childrenToReturn.map((child) => ( 
                    <SyntaxTreeNode key={child.id} {...child} />
                ))}
            </div>
        )
    }

    if (!nodeData.parent) 
        return (
            <div className="nodeBlock-container-vertical">
                <span id={nodeData.id} className="root-node">{nodeData.label}</span>
                {nodeData.children ? returnChildren() : <></>}
            </div>
        )

    else if (nodeData.children) 
    return (
        <div className="nodeBlock-container-vertical">         
            {editing ? <input type="text" onChange={(e) => setNewText(e.currentTarget.value)} onBlur={() => updateNodeLabel()}/> 
            : <span id={nodeData.id} onClick={() => setEditing(true)} className="nodeBlock">{nodeData.label}</span>}
            {nodeData.children ? returnChildren() : <></>}
        </div>
    ) 

    else return (
            <span id={nodeData.id} className="wordBlock">{nodeData.label}</span>
    )
}

export default SyntaxTreeNode