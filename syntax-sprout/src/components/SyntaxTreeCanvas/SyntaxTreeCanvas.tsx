import { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { TreeNode } from '../TreeNode'
import SyntaxTreeNode from '../SyntaxTreeNode/SyntaxTreeNode'
import SyntaxTreePage from '../SyntaxTreePage/SyntaxTreePage'
import SyntaxTreeContext from '../SyntaxTreeContext/SyntaxTreeContext'
import './SyntaxTreeCanvas.css'
import { expectedTree, bigTree } from '../../testcases/TestRoots'


const SyntaxTreeCanvas : React.FC = () => {
    const {root, setRoot, selectedNodes, setSelectedNodes} = useContext(SyntaxTreeContext)!
    const [confirmed, setConfirmed] = useState(true)
    const [lines, setLines] = useState<JSX.Element[]>([])
    const [showNewNodeInput, setShowNewNodeInput] = useState(false)
    const [newNodeText, setNewNodeText] = useState("")


    function assignParents(node: TreeNode) {
        if (node.children) {
            node.children.forEach(child => {
                child.parent = node
                if (child.children) {
                    assignParents(child)
                }})
        }
    }

    const updateNodeLabel = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (selectedNodes.length >= 1) {
                const newRoot = root.clone()
                newRoot.generateParentFromChildren(selectedNodes, newNodeText)
                setSelectedNodes([])
                setRoot(newRoot)
            }
            setShowNewNodeInput(false)
        }
    }

    const newNodeInput = () => {
        return (
            <div className="new-node-input">
                <label>Enter label: </label>
                <input 
                type="text" 
                onChange={(e) => setNewNodeText(e.currentTarget.value)} onKeyDown={updateNodeLabel}></input>
                <button onClick={() => setShowNewNodeInput(false)}>Cancel</button>
            </div>
        )
    }

    const reRenderLines = () => {
        const linesToRender = renderTreeLines(root, null)
        setLines(linesToRender!) 
    }

    useEffect(() => {
        assignParents(bigTree)
        assignParents(expectedTree)
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
                        
    }, [root])

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

            let stroke = "black"
            // if (!child.children) {
            //     stroke = "darkgreen"
            // } else {
            //     stroke = "#773300"
            // }
    
            newLines.push(
                <line
                    key={child.id}
                    x1={parentCenterX}
                    y1={parentBottomY}
                    x2={childCenterX}
                    y2={childTopY}
                    stroke={stroke} 
                    strokeWidth="3"
                    strokeOpacity="1">
                </line>
                )
            newLines.push(...renderTreeLines(child, parentRect))
        });
        return newLines
    }

    const syntaxTree = () => {
        return (
            <>
            {showNewNodeInput && newNodeInput()}
            <div className="canvas-container">
            <button onClick={() => setConfirmed(false)}>Change sentence</button>
            <button onClick={() => setRoot(expectedTree)}>Test expected tree</button>
            <button onClick={() => setRoot(bigTree)}>Test big tree</button>
            </div>

            {/** The canvas for the syntax tree */}
            <div className="canvas-container">
                <div onContextMenu={(event) => {event.preventDefault(); setShowNewNodeInput(true)}} id="syntax-tree-container" className="canvas">     
                    <SyntaxTreeNode node={root} /> 
                    <svg className="tree-lines" preserveAspectRatio="xMidYMid meet">
                        {lines}
                    </svg>      
                </div>
            </div>

            <ul>
                {selectedNodes.map((node) => <li>
                    {`Node name: ${node.label} Node id: ${node.id} - Parent name: ${node.parent!.label} Parent id: ${node.parent!.id}`}
                </li>)}
            </ul>
            </>
        )
    }

    const content = () => {
        if (confirmed) {
            return (
                <>
                    {syntaxTree()}    
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