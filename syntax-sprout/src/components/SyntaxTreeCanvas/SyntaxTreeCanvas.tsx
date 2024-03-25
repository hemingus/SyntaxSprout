import { useState, useEffect, useLayoutEffect } from 'react'
import { TreeNode } from '../SyntaxTreeNode/SyntaxTreeNode'
import SyntaxTreeNode from '../SyntaxTreeNode/SyntaxTreeNode'
import SyntaxTreePage from '../SyntaxTreePage/SyntaxTreePage'
import { nanoid } from 'nanoid'
import './SyntaxTreeCanvas.css'

interface SyntaxTreeCanvasProps {
    root: TreeNode
}

const SyntaxTreeCanvas : React.FC<SyntaxTreeCanvasProps> = ({root}) => {
    const [confirmed, setConfirmed] = useState(true)
    const [rootNode, setRootNode] = useState(root)
    const [lines, setLines] = useState<JSX.Element[]>([])
    
    var c1_gc1 = {
        id: nanoid(),
        label: "child1_grandchild1"
    }

    var c1_gc2 = {
        id: nanoid(),
        label: "child1_grandchild2"
    }

    var c1_gc3 = {
        id: nanoid(),
        label: "child1_grandchild3"
    }

    var c2_gc1 = {
        id: nanoid(),
        label: "child2_grandchild1"
    }

    var c2_gc2 = {
        id: nanoid(),
        label: "child2_grandchild2"
    }

    var c2_gc3 = {
        id: nanoid(),
        label: "child2_grandchild3"
    }

    var c3_gc1 = {
        id: nanoid(),
        label: "child3_grandchild1"
    }

    var c3_gc2 = {
        id: nanoid(),
        label: "child3_grandchild2"
    }

    var c3_gc3 = {
        id: nanoid(),
        label: "child3_grandchild3"
    }

    var child1: TreeNode = {
        id: nanoid(),
        label: "the_eldest_son_child1",
        children: [c1_gc1, c1_gc2, c1_gc3]
    }

    var child2: TreeNode = {
        id: nanoid(),
        label: "the_middle_son_child2",
        children: [c2_gc1, c2_gc2, c2_gc3]
    }

    var child3: TreeNode = {
        id: nanoid(),
        label: "the_youngest_son_child3",
        children: [c3_gc1, c3_gc2, c3_gc3]
    }

    const testRoot: TreeNode = {
        id: "testRoot",
        label: "testRoot",
        children: [child1, child2, child3]
    }

    function assignParents(node: TreeNode) {
        if (node.children) {
            node.children.forEach(child => 
                {child.parent = node
                if (child.children) {
                    assignParents(child)
                }})
        }
    }

    const reRenderLines = () => {
        setLines([])
        const linesToRender = renderTreeLines(rootNode, null)
        setLines(linesToRender!) 
    }

    useEffect(() => {
        assignParents(testRoot)
    })

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
           reRenderLines()
        });

        // Observe the syntax tree container
        const syntaxTreeContainer = document.getElementById("syntax-tree-container");

        if (syntaxTreeContainer) {
            resizeObserver.observe(syntaxTreeContainer);
        }

        syntaxTreeContainer!.addEventListener('scroll', reRenderLines)

        window.addEventListener('resize', reRenderLines)
        window.addEventListener('scroll', reRenderLines)
        reRenderLines()
        return () => {
            window.removeEventListener('resize', reRenderLines)
            window.removeEventListener('scroll', reRenderLines)
            syntaxTreeContainer?.removeEventListener('scroll', reRenderLines)
            resizeObserver.disconnect()}
                        
    }, [rootNode])

    function renderTreeLines(node: TreeNode, parentNodeRect: DOMRect | null) {
        const newLines: JSX.Element[] = []

        if (!node.children) {
            return newLines
        }

        const parentRect = document.getElementById(node.id)?.getBoundingClientRect()!;
        const parentCenterX = parentRect.left + parentRect.width/2 + window.scrollX;
        const parentBottomY = parentRect.top + parentRect.height + window.scrollY;

        if (parentNodeRect === null) {
            return renderTreeLines(node, parentRect)
        }
        
        node.children.forEach((child: TreeNode) => {
            const childRect = document.getElementById(child.id)?.getBoundingClientRect()!;
            const childCenterX = childRect.left + childRect.width / 2 + window.scrollX;
            const childTopY = childRect.top + window.scrollY;
            
            newLines.push(
                <line
                    key={child.id}
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
            <button onClick={() => setRootNode(testRoot)}>Test custom root</button>
            <div id="syntax-tree-container" className="canvas-container">
                
                    <SyntaxTreeNode {...rootNode} />  
                
                <svg className="tree-lines" preserveAspectRatio="xMidYMid meet">
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