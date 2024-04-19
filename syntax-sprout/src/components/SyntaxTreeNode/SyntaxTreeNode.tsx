import './SyntaxTreeNode.css'
import { useState, useContext } from 'react'
import SyntaxTreeContext from '../SyntaxTreeContext/SyntaxTreeContext';
import { TreeNode } from '../TreeNode'

interface SyntaxTreeNodeProps {
    node: TreeNode
}

const SyntaxTreeNode: React.FC<SyntaxTreeNodeProps> = ({node}) => {
    const {root, setRoot, selectedNodes, setSelectedNodes} = useContext(SyntaxTreeContext)!
    const [editText, setEditText] = useState("") 
    const [editing, setEditing] = useState(false)
    const [showOptions, setShowOptions] = useState(false)

    const updateNodeLabel = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            let currentNode = root.findNodeById(node.id)!
            currentNode.label = editText
            refreshRoot()
            setEditing(false)
        }
    }

    function handleSelectNode(): void {
        if (node.parent && node.parent.children) {
            const highestSelectedIndex = node.parent.children.indexOf(selectedNodes[selectedNodes.length -1]) 
            const targetIndex = node.parent.children.indexOf(node)
            if (selectedNodes.length < 1) {
                setSelectedNodes([node])
            } else if (selectedNodes[0].parent != node.parent || selectedNodes.includes(node)) {
                setSelectedNodes([node])
                
            } else if (node.parent.children.indexOf(node) > node.parent.children.indexOf(selectedNodes[selectedNodes.length -1])){
                const nodesToAdd = [...node.parent.children.slice(highestSelectedIndex + 1, targetIndex + 1)]
                const newSelectedNodes = []
                newSelectedNodes.push(...selectedNodes)
                newSelectedNodes.push(...nodesToAdd)
                setSelectedNodes(newSelectedNodes)
            } else {
                setSelectedNodes([node])
            }
        }
    }

    function refreshRoot(): void {
        const newRoot = root.clone()
        setRoot(newRoot)
    }

    const returnChildren = () => {
        const childrenToReturn = node.children!

        return (
            <div className="nodeBlock-container">
                {childrenToReturn.map((child) => ( 
                    <SyntaxTreeNode key={child.id} node={child} />
                ))}
            </div>
        )
    }

    function handleContextMenuNode(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault()
        setShowOptions(!showOptions)
    }
    // If the node has no parent, it is the root which has its own properties.
    if (!node.parent) 
        return (
            <div className="nodeBlock-container-vertical">
                <span 
                id={node.id} 
                className="root-node">
                    {node.label}
                </span>
                {node.children ? returnChildren() : <></>}
            </div>
        )
    // If the node has children, it is not a leaf, it is a regular node inside the tree graph.
    else if (node.children) 
    return (
        <div className="nodeBlock-container-vertical"> 
            {editing && (
            <input className="edit-node" 
            type="text" 
            onChange={(e) => setEditText(e.currentTarget.value)} onKeyDown={updateNodeLabel}
            onBlur={() => setEditing(false)}
            />)} 

            <span className="nodeBlock"
            style={selectedNodes.includes(node) ? {borderColor: "white"} : {}}
            id={node.id} 
            onContextMenu={handleContextMenuNode}
            onClick={handleSelectNode}>
                {node.label}
            </span>

            {node.children ? returnChildren() : <></>}

            {showOptions && (
            <div className="node-options"
            onMouseLeave={() => setShowOptions(false)}>
                <span className="option-block" onClick={() => {root.deleteNodeById(node.id); setSelectedNodes([]); refreshRoot(); setShowOptions(false)}}>Delete</span>
                <span className="option-block" onClick={() => {setEditing(true); setShowOptions(false)}}>Edit</span>
            </div>
            )}
        </div>
    ) 
    // If the node has no children, it is a leaf, which means it is a word in the generated sentence.
    else return (
        <>
            <span 
            style={selectedNodes.includes(node) ? {borderColor: "white"} : {}}
            id={node.id} 
            className="wordBlock"
            onContextMenu={() => setShowOptions(true)}
            onClick={handleSelectNode}>
                {node.label}
            </span>
        </>
    )
}

export default SyntaxTreeNode