import { useState, useEffect, useRef, useContext } from 'react'
import SyntaxTreeContext from './SyntaxTreeContext'

interface SyntaxTreeActionProps {
    active: boolean
    posX: number
    posY: number
    onClose: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const SyntaxTreeActions = ({active, posX, posY, onClose}: SyntaxTreeActionProps) => {
    const {root, setRoot, selectedNodes, setSelectedNodes} = useContext(SyntaxTreeContext)!
    const [showNewNodeInput, setShowNewNodeInput] = useState(false)
    const [newNodeText, setNewNodeText] = useState("")
    const [editing, setEditing] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          {handleClose}
        }
      }, [showNewNodeInput]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {

            if (selectedNodes.length >= 1) {
                if (event.altKey && event.key === 'x') {
                    deleteSelectedNodes()
                } 
                else if (event.altKey && event.key === 'w') {
                    setShowNewNodeInput(true)
                }
                else if (event.altKey && event.key === 'q') {
                    setEditing(true)
                    setShowNewNodeInput(true)
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedNodes])

    function refreshRoot(): void {
        const newRoot = root.clone()
        setRoot(newRoot)
    }

    function putArrow(): void {
        if (selectedNodes.length >= 2) {
            const arrowTargets = []
            for (let i = 1; i < selectedNodes.length; i++) {
                arrowTargets.push(selectedNodes[i].id)
            }
            selectedNodes[0].setMeta({...selectedNodes[0].meta, arrows: arrowTargets})
            refreshRoot()
            setSelectedNodes([])
        }   
    }

    function removeArrow(): void {
        if (selectedNodes.length == 1) {
            const newMeta = {...selectedNodes[0].meta, arrows: undefined}
            selectedNodes[0].setMeta(newMeta)
            refreshRoot()
            setSelectedNodes([])
        }
    }

    function mergeLines(): void {
        selectedNodes.forEach(node => {node.meta?.merged ? node.setMeta({merged: !node.meta!.merged}) : node.setMeta({merged: true})})
        refreshRoot()
        setSelectedNodes([])
    }

    function deleteSelectedNodes() {
        selectedNodes.forEach(node => {node.children ? root.deleteNodeById(node.id) : {}})
        refreshRoot()
        setSelectedNodes([])
        setShowNewNodeInput(false)
    }

    function editSelectedNodes() {
        selectedNodes.forEach(node => node.children ? node.setLabel(newNodeText) : {})
        refreshRoot()
        setSelectedNodes([])
        setShowNewNodeInput(false)
    }

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

    function handleClose(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        onClose(event)
    }

    return (
        <>
        {showNewNodeInput && newNodeInput()} 
        {active &&
        <div style={{top: posY, left: posX}} className="node-options"
        onMouseLeave={handleClose} onClick={handleClose}>
            <span className="option-block" onClick={() => setShowNewNodeInput(true)}>Generate new parent node from selected (alt + w)</span>
            <span className="option-block" onClick={() => {deleteSelectedNodes()}}>Delete selected nodes (alt + x)</span>
            <span className="option-block" onClick={() => {setEditing(true); setShowNewNodeInput(true)}}>Edit selected nodes (alt + q)</span>
            <span className="option-block" onClick={() => mergeLines()}>Merge/Unmerge children</span>
            {selectedNodes.length >= 2 ? <span className="option-block" onClick={() => putArrow()}>Put Arrow</span> :
            <span className="option-block" onClick={() => removeArrow()}>Remove Arrow</span>}
        </div>}
        </>
    )
}

export default SyntaxTreeActions