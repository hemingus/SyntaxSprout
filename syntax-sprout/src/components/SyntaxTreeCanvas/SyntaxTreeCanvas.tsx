import { useState, useEffect, useRef, useContext } from 'react'
import SyntaxTreeNode from '../SyntaxTreeNode/SyntaxTreeNode'
import SyntaxTreePage from '../SyntaxTreePage/SyntaxTreePage'
import SyntaxTreeContext from '../SyntaxTreeContext'
import './SyntaxTreeCanvas.css'
import { expectedTree, bigTree, assignParents } from '../../testcases/TestRoots'
import HtmlToImageButton from '../HtmlToImageButton/HtmlToImageButton'
import SyntaxTreeLines from '../SyntaxTreeLines/SyntaxTreeLines'

const SyntaxTreeCanvas : React.FC = () => {
    const {root, setRoot, selectedNodes, setSelectedNodes} = useContext(SyntaxTreeContext)!
    const [confirmed, setConfirmed] = useState(true)
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
            <div style={{top: position.y, left: position.x}} className="node-options"
            onMouseLeave={() => setShowOptions(false)}>
                <span className="option-block" onClick={() => {setShowNewNodeInput(true); }}>Generate new parent node from selected</span>
                <span className="option-block" onClick={() => {deleteSelectedNodes()}}>Delete selected nodes</span>
                <span className="option-block" onClick={() => {setEditing(true); setShowNewNodeInput(true)}}>Edit selected nodes</span>
            </div>
            )}
            {showNewNodeInput && newNodeInput()}
            <div className="canvas-container solid bg-lime-700 p-8">
                <button 
                    className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500" 
                    onClick={() => setConfirmed(false)}>
                        Change sentence
                </button>
                <button 
                    className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                    onClick={() => setRoot(expectedTree)}>
                        Test expected tree
                </button>
                <button 
                    className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                    onClick={() => setRoot(bigTree)}>
                        Test big tree
                </button>
                <HtmlToImageButton element={syntaxTreeRef.current} />
            </div>

            {/** The canvas for the syntax tree */}
            <div className="flex justify-center items-start overflow-x-auto relative">
                <div ref={syntaxTreeRef} onContextMenu={handleContextMenuNode} id="syntax-tree-canvas" className="canvas">  
                    <SyntaxTreeNode node={root} /> 
                    <SyntaxTreeLines />    
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