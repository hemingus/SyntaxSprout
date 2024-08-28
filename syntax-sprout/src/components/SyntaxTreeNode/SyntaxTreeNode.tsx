import './SyntaxTreeNode.css'
import { useContext } from 'react'
import SyntaxTreeContext from '../SyntaxTreeContext';
import { TreeNode } from '../TreeNode'
import { useTheme } from '../Theme/ThemeContext';

interface SyntaxTreeNodeProps {
    node: TreeNode
}

const SyntaxTreeNode: React.FC<SyntaxTreeNodeProps> = ({node}) => {
    const {selectedNodes, setSelectedNodes} = useContext(SyntaxTreeContext)!
    const {theme} = useTheme()

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


    // If the node has no parent, it is the root which has its own properties.
    if (!node.parent) 
        return (
            <div className="nodeBlock-container-vertical">
                <span 
                id={node.id} 
                className={`root-node ${theme.root}`}>
                    {node.label}
                </span>
                {node.children ? returnChildren() : <></>}
            </div>
        )
    // If the node has children, it is not a leaf, it is a regular node inside the tree graph.
    else if (node.children) 
    return (
        <div className="nodeBlock-container-vertical"> 
            <span className={`node-block ${theme.node}`}
            style={selectedNodes.includes(node) ? {borderColor: "white"} : {}}
            id={node.id} 
            onClick={handleSelectNode}>
                {node.label}
            </span>

            {node.children && returnChildren()}
        </div>
    ) 
    // If the node has no children, it is a leaf, which means it is a word in the generated sentence.
    else return (
        <>
            <span 
            style={selectedNodes.includes(node) ? {borderColor: "white"} : {}}
            id={node.id} 
            className={`wordBlock ${theme.leaf}`}
            onClick={handleSelectNode}>
                {node.label}
            </span>
        </>
    )
}

export default SyntaxTreeNode