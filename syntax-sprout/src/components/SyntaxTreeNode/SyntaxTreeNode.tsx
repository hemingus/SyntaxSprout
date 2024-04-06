import './SyntaxTreeNode.css'
import { useState, useContext } from 'react'
import SyntaxTreeContext from '../SyntaxTreeContext/SyntaxTreeContext';
import { TreeNode } from '../TreeNode'

interface SyntaxTreeNodeProps {
    nodeData: TreeNode
}

const SyntaxTreeNode: React.FC<SyntaxTreeNodeProps> = ({nodeData}) => {
    const {root, setRoot} = useContext(SyntaxTreeContext)!
    const [newText, setNewText] = useState("") 
    const [editing, setEditing] = useState(false)
    const [showOptions, setShowOptions] = useState(false)

    const updateNodeLabel = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            let currentNode = root.findNodeById(nodeData.id)!
            currentNode.label = newText
            refreshRoot()
            setEditing(false)
        }
    }

    function refreshRoot(): void {
        const newRoot = root.clone()
        setRoot(newRoot)
    }

    const returnChildren = () => {
        const childrenToReturn = nodeData.children!

        return (
            <div className="nodeBlock-container">
                {childrenToReturn.map((child) => ( 
                    <SyntaxTreeNode key={child.id} nodeData={child} />
                ))}
            </div>
        )
    }

    if (!nodeData.parent) 
        return (
            <div className="nodeBlock-container-vertical">
                <span 
                id={nodeData.id} 
                className="root-node">
                    {nodeData.label}
                </span>
                {nodeData.children ? returnChildren() : <></>}
            </div>
        )

    else if (nodeData.children) 
    return (
        <div className="nodeBlock-container-vertical">         
            {editing ? <input type="text" onChange={(e) => setNewText(e.currentTarget.value)} onKeyDown={updateNodeLabel}/> 
            : <span 
            id={nodeData.id} 
            onClick={() => setEditing(true)} 
            className="nodeBlock">
                {nodeData.label}
            </span>}
            {nodeData.children ? returnChildren() : <></>}
        </div>
    ) 

    else return (
        <>
            <span 
            id={nodeData.id} 
            className="wordBlock"
            onClick={() => setShowOptions(true)}>
                {nodeData.label}
            </span>
            {showOptions && (
                <menu>
                    <span onClick={() => {root.deleteChild(nodeData); setShowOptions(false)}}>See if it works</span>
                    <span onClick={() => {alert("anything"); setShowOptions(false)}}>Anything</span>
                </menu>
            )}
        </>
    )
}

export default SyntaxTreeNode