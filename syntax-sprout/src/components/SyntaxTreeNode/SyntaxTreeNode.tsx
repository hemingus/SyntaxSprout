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

    function handleContextMenuNode(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault()
        setShowOptions(!showOptions)
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
            {editing && (
            <input className="edit-node" 
            type="text" 
            onChange={(e) => setNewText(e.currentTarget.value)} onKeyDown={updateNodeLabel}
            onBlur={() => setEditing(false)}
            />)} 
            <span className="nodeBlock"
            id={nodeData.id} 
            onContextMenu={handleContextMenuNode}>
                {nodeData.label}
            </span>
            {nodeData.children ? returnChildren() : <></>}
            {showOptions && (
            <div className="node-options"
            onMouseLeave={() => setShowOptions(false)}>
                <span className="option-block" onClick={() => {root.deleteNodeById(nodeData.id); refreshRoot(); setShowOptions(false)}}>Delete</span>
                <span className="option-block" onClick={() => {setEditing(true); setShowOptions(false)}}>Edit</span>
            </div>
            )}
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
                <div>
                    <span onClick={() => {setEditing(true); setShowOptions(false)}}>Edit</span>
                </div>
            )}
        </>
    )
}

export default SyntaxTreeNode