import { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react'
import { TreeNode } from '../TreeNode'
import SyntaxTreeNode from '../SyntaxTreeNode/SyntaxTreeNode'
import SyntaxTreePage from '../SyntaxTreePage/SyntaxTreePage'
import SyntaxTreeContext from '../SyntaxTreeContext/SyntaxTreeContext'
import './SyntaxTreeCanvas.css'
import { expectedTree, bigTree, assignParents } from '../../testcases/TestRoots'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { dataURLToBlob } from '../../utils/DataConvertion'


const SyntaxTreeCanvas : React.FC = () => {
    const {root, setRoot, selectedNodes, setSelectedNodes} = useContext(SyntaxTreeContext)!
    const [confirmed, setConfirmed] = useState(true)
    const [lines, setLines] = useState<JSX.Element[]>([])
    const [showNewNodeInput, setShowNewNodeInput] = useState(false)
    const [newNodeText, setNewNodeText] = useState("")
    const [showOptions, setShowOptions] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [editing, setEditing] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const syntaxTreeRef = useRef<HTMLDivElement>(null);

    // assign parent-values for test-trees
    useEffect(() => {
        assignParents(bigTree)
        assignParents(expectedTree)
    }, [])

    // focus input element when it appears (for instant typing)
    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, [showNewNodeInput]);

    // trigger functions from hotkeys
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {

            if (selectedNodes.length >= 1) {
                if (event.altKey && event.key === 'x') {
                    deleteSelectedNodes()
                } 
                else if (event.altKey && event.key === 'w') {
                    setShowNewNodeInput(true)
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedNodes])

    // make sure that lines in the syntax tree gets rendered correctly and responds to changes.
    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
           reRenderLines()
        });
        const syntaxTreeCanvas = document.getElementById("syntax-tree-canvas");
        if (syntaxTreeCanvas) {
            resizeObserver.observe(syntaxTreeCanvas);
        }
        syntaxTreeCanvas!.addEventListener('scroll', reRenderLines)

        window.addEventListener('resize', reRenderLines)
        window.addEventListener('scroll', reRenderLines)
        reRenderLines()
        return () => {
            window.removeEventListener('resize', reRenderLines)
            window.removeEventListener('scroll', reRenderLines)
            syntaxTreeCanvas?.removeEventListener('scroll', reRenderLines)
            resizeObserver.disconnect()}
                        
    }, [root])

    // transform the syntax tree canvas into a image file (png) and download it.
    const handleDownload = (): void => {
        if (syntaxTreeRef.current) {
            // Scroll to the top left to capture the full tree
            syntaxTreeRef.current.scrollTop = 0;
            syntaxTreeRef.current.scrollLeft = 0;

            const originalOverflow = syntaxTreeRef.current.style.overflow;

            syntaxTreeRef.current.style.overflow = 'visible';
    
            setTimeout(() => {
                htmlToImage.toPng(syntaxTreeRef.current as HTMLElement, { pixelRatio: 2 }) // Increase pixel ratio for better quality
                    .then((dataUrl: string) => {
                        const blob = dataURLToBlob(dataUrl);
                        saveAs(blob, 'syntax-tree.png');
                        syntaxTreeRef.current!.style.overflow = originalOverflow;
                    })
                    .catch((error: Error) => {
                        console.error('Error generating image:', error);
                        syntaxTreeRef.current!.style.overflow = originalOverflow;
                    });
            }, 500); // Delay to ensure DOM is fully rendered
        }
    };

    // adding a new node to the syntax tree, updating its structure.
    const insertNewNode = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (selectedNodes.length >= 1) {
                const newRoot = root.clone()
                newRoot.generateParentFromChildren(selectedNodes, newNodeText)
                setSelectedNodes([])
                setRoot(newRoot)
            }
            setShowNewNodeInput(false)
        } else if (event.key === "Escape") {
            setShowNewNodeInput(false)
        }
    }

    // updating label of selected nodes.
    function updateNodeLabel(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            if (selectedNodes.length >= 1) {
                editSelectedNodes()
            }
            setShowNewNodeInput(false)
            setEditing(false)
        } else if (event.key === "Escape") {
            setShowNewNodeInput(false)
        }
    }  

    // input screen to set nodes label
    const newNodeInput = () => {
        return (
            <div className="new-node-input" onClick={() => setShowNewNodeInput(false)}>
                <label>Enter label: </label>
                <input
                ref={inputRef}
                type="text"
                onChange={(e) => setNewNodeText(e.currentTarget.value)} 
                onKeyDown={editing ? updateNodeLabel : insertNewNode}>
                </input>
            </div>
        )
    }

    const reRenderLines = () => {
        const linesToRender = renderTreeLines(root, null)
        setLines(linesToRender!) 
    }

    // calculates the lines that connects the syntax tree. @Return list of SVG <line> elements 
    function renderTreeLines(node: TreeNode, parentNodeRect: DOMRect | null) {
        const newLines: JSX.Element[] = []
        if (!node.children) {
            return newLines
        }
        const canvas = document.getElementById("syntax-tree-canvas")!
        const canvasRect: DOMRect = canvas?.getBoundingClientRect()!
        const parentRect = document.getElementById(node.id)?.getBoundingClientRect()!
        const parentCenterX = parentRect.left + parentRect.width/2 + canvas.scrollLeft - canvas.offsetLeft 
        const parentBottomY = parentRect.top + parentRect.height + canvas.scrollTop - canvasRect.top
        if (parentNodeRect === null) {
            return renderTreeLines(node, parentRect)
        }      
        node.children.forEach((child: TreeNode) => {
            const childRect = document.getElementById(child.id)?.getBoundingClientRect()!
            const childCenterX = childRect.left + childRect.width / 2 + canvas.scrollLeft - canvasRect.left
            const childTopY = childRect.top + canvas.scrollTop - canvasRect.top
            let stroke = "black"
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

    function handleContextMenuNode(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault()
        setPosition({ x: event.clientX, y: event.clientY });
        setShowOptions(!showOptions)
    }

    function refreshRoot(): void {
        const newRoot = root.clone()
        setRoot(newRoot)
    }

    function deleteSelectedNodes() {
        selectedNodes.forEach(node => {node.children ? root.deleteNodeById(node.id) : {}})
        refreshRoot()
        setSelectedNodes([])
        setShowOptions(false)
    }

    function editSelectedNodes() {
        selectedNodes.forEach(node => node.children ? node.setLabel(newNodeText) : {})
        setSelectedNodes([])
        setShowOptions(false)
        setShowNewNodeInput(false)
    }

    const syntaxTree = () => {
        return (
            <>
            {showOptions && (
            <div style={{position: "absolute", top: position.y, left: position.x}} className="node-options"
            onMouseLeave={() => setShowOptions(false)}>
                <span className="option-block" onClick={() => {setShowNewNodeInput(true); }}>Generate new parent node from selected</span>
                <span className="option-block" onClick={() => {deleteSelectedNodes()}}>Delete selected nodes</span>
                <span className="option-block" onClick={() => {setEditing(true); setShowNewNodeInput(true)}}>Edit selected nodes</span>
            </div>
            )}
            {showNewNodeInput && newNodeInput()}
            <div className="canvas-container">
            <button onClick={() => setConfirmed(false)}>Change sentence</button>
            <button onClick={() => setRoot(expectedTree)}>Test expected tree</button>
            <button onClick={() => setRoot(bigTree)}>Test big tree</button>
            <button onClick={handleDownload}>Download Syntax Tree as Image</button>
            </div>

            {/** The canvas for the syntax tree */}
            <div className="canvas-container">
                <div ref={syntaxTreeRef}  onContextMenu={handleContextMenuNode} id="syntax-tree-canvas" className="canvas">  
                    <SyntaxTreeNode node={root} /> 
                    <svg className="tree-lines" preserveAspectRatio="xMidYMid meet">
                        {lines}
                    </svg>      
                </div>
            </div>

            <ul>
                {selectedNodes.map((node, index) => <li key={index} style={{color: "white", listStyle: "none"}}>
                    {`${index+1}: Node name: ${node.label} Node id: ${node.id} - Parent name: ${node.parent!.label} Parent id: ${node.parent!.id}`}
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