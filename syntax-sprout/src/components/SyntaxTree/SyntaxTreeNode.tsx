import { useContext } from 'react'
import SyntaxTreeContext from './SyntaxTreeContext';
import { TreeNode } from '../TreeNode'
import { useTheme } from '../Theme/ThemeContext';
import { useTreeSetting } from '../Settings/SettingsContex';
import './../../index.css'
import Tooltip from '../../utils/Tooltip';

interface SyntaxTreeNodeProps {
    node: TreeNode
}

const SyntaxTreeNode: React.FC<SyntaxTreeNodeProps> = ({node}) => {
    const {selectedNodes, setSelectedNodes} = useContext(SyntaxTreeContext)!
    const {activeTheme} = useTheme()
    const {setting} = useTreeSetting()

    function handleFreeSelectNode(): void {
        if (selectedNodes.includes(node)) {
            setSelectedNodes(selectedNodes.filter(n => n !== node))
        } else {
            setSelectedNodes([...selectedNodes, node])
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

    const returnChildren = () => {
        return (
            <div className={`relative flex flex-row justify-center items-start m-auto ${node.meta?.merged ? "gap-0" : setting.xGap}`}>
                {node.children!.map((child) => ( 
                    <SyntaxTreeNode key={child.id} node={child} />
                ))}
            </div>
        )
    }

    // If the node has no parent, it is the root which has its own properties.
    if (!node.parent) 
        return (
            <div className={`relative h-full w-full flex flex-col justify-start items-center ${setting.yGap}`}>
                <Tooltip text="🌱root">
                <span className={`relative block w-fit z-3 px-[4px] pb-[2px]
                ${setting.nodeSize} text-center cursor-pointer
                border-solid rounded-[8px] border-[3px]
                ${activeTheme.node}`}
                style={selectedNodes.includes(node) ? {borderColor: "#AAFF00", boxShadow: "0 0 1px 1px black", zIndex: 30} : {}}
                id={node.id}
                onClick={(e) => {e.stopPropagation(); e.ctrlKey ? handleSelectNode() : handleFreeSelectNode();}}>
                    {node.label}
                </span>
                </Tooltip>
                {node.children && returnChildren()}
            </div>
        )
    // If the node has children, it is not a leaf, it is a regular node inside the tree graph.
    else if (node.children) 
        return (
            <div className={`relative h-full w-full flex flex-col justify-start items-center ${setting.yGap}`}> 
                <span className={`relative block w-fit z-3 px-[4px] pb-[2px]
                ${setting.nodeSize} text-center cursor-pointer
                border-solid rounded-[8px] border-[3px] ${activeTheme.node}`}
                style={selectedNodes.includes(node) ? {borderColor: "#AAFF00", boxShadow: "0 0 1px 1px black", zIndex: 30} : {}}
                id={node.id} 
                onClick={(e) => {e.stopPropagation(); e.ctrlKey ? handleSelectNode() : handleFreeSelectNode();}}>
                    {node.label}
                </span>
                {node.children && returnChildren()}
            </div>
    ) 
    // If the node has no children, it is a leaf, which means it is a word in the generated sentence.
    else 
        return (  
            <span 
            style={selectedNodes.includes(node) ? {borderColor: "#AAFF00", boxShadow: "0 0 1px 1px black", zIndex: 30} : {}}
            id={node.id} 
            className={`relative block w-fit z-3 px-[4px] pb-[2px]
            ${setting.nodeSize} text-center cursor-pointer
            border-solid rounded-[8px] border-[3px] ${activeTheme.leaf}`}
            onClick={(e) => {e.stopPropagation(); e.ctrlKey ? handleSelectNode() : handleFreeSelectNode();}}>
                {node.label}
            </span>
    )
}

export default SyntaxTreeNode