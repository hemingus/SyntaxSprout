import { useState, useLayoutEffect } from 'react'
import { TreeNode } from '../SyntaxTreeNode/SyntaxTreeNode'
import SyntaxTreeNode from '../SyntaxTreeNode/SyntaxTreeNode'
import SyntaxTreePage from '../SyntaxTreePage/SyntaxTreePage'
import './SyntaxTreeCanvas.css'

interface SyntaxTreeCanvasProps {
    root: TreeNode
}

const SyntaxTreeCanvas : React.FC<SyntaxTreeCanvasProps> = ({root}) => {
    const [confirmed, setConfirmed] = useState(true)
    const [rootNode, setRootNode] = useState(root)
    const [lines, setLines] = useState<JSX.Element[]>([])
    
    const customRoot: TreeNode = {
        label: "S",
        children: [{label: "VP",
                    children: [
                        {label: "they"},
                        {label: "were"},
                        {label: "V", 
                            children: [{label: "driving"}]}
                    ]},
                    {label: "NP",
                    children: [
                        {label: "down"},
                        {label: "N",
                            children: [{label: "Art",
                                children: [{label: "the"}]},
                            {label: "street"}]},
                        {label: "completely"},
                        {label: "unaware"}
                    ]}
                ]
    }

    useLayoutEffect(() => {
        setLines([])
        const linesToRender = renderTreeLines(rootNode, null)
        setLines(linesToRender!)
    }, [rootNode, window.length])

 

    function renderTreeLines(node: TreeNode, parentNodeRect: DOMRect | null) {
        const newLines: JSX.Element[] = []

        if (!node.children) {
            return newLines
        }

        const parentRect = document.getElementById(node.label)?.getBoundingClientRect()!;
        const parentCenterX = parentRect.left + parentRect.width/2  + document.getElementById("syntax-tree-container")?.scrollLeft!;
        const parentBottomY = parentRect.top + parentRect.height;

        if (parentNodeRect === null) {
            return renderTreeLines(node, parentRect)
        }
        
        node.children.forEach((child: TreeNode) => {
            const childRect = document.getElementById(child.label)?.getBoundingClientRect()!;
            const childCenterX = childRect.left + childRect.width / 2;
            const childTopY = childRect.top;
            
            newLines.push(
                <line
                    key={`${node.label}-${child.label}`}
                    x1={parentCenterX}
                    y1={parentBottomY}
                    x2={childCenterX}
                    y2={childTopY}
                    stroke="black" 
                    strokeWidth="3"
                    strokeOpacity="1">
                </line>
                )
            newLines.push(...renderTreeLines(child, parentRect))
        });

        return newLines
    }

    const syntaxTree = () => {
        console.log(rootNode.children)
        return (
            <>
            <button onClick={() => setRootNode(customRoot)}>Test custom root</button>
            <div className="canvas-container">
                <div  id="syntax-tree-container" className="canvas-container">
                    <SyntaxTreeNode {...rootNode} />  
                </div>
                <svg className="tree-lines">
                    {lines}
                </svg>      
            </div>
            </>
        )
    }

    const content = () => {
        if (confirmed) {
            return (
                <>
                    {syntaxTree()}
                    <button onClick={() => setConfirmed(false)}>Change sentence</button>
                </>
                )
        }
        return <SyntaxTreePage />
    }

    return (
        <div>
            {content()}
        </div>
    )
}

export default SyntaxTreeCanvas