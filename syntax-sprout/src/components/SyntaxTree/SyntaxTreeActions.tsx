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
    const [editing, setEditing] = useState(false)
    
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
        selectedNodes.forEach(node => root.deleteNodeById(node.id))
        refreshRoot()
        setSelectedNodes([])
        setShowNewNodeInput(false)
    }

    function editSelectedNodes(text: string) {
        selectedNodes.forEach(node => node.children ? node.setLabel(text) : {})
        refreshRoot()
        setSelectedNodes([])
        setShowNewNodeInput(false)
    }

    function insertNewNode(text: string) {
        console.log("newLabel")
        if (selectedNodes.length >= 1) {
            const newRoot = root.clone()
            newRoot.generateParentFromChildren(selectedNodes, text)
            setSelectedNodes([])
            setRoot(newRoot)
        }
        setShowNewNodeInput(false)
    }

    function updateNodeLabel(text: string) {
        console.log("updateLabel")
        if (selectedNodes.length >= 1) {
            editSelectedNodes(text)
        }
        setShowNewNodeInput(false)
        setEditing(false)
    }  

    // Input component
    const NewNodeInput = () => {
        const inputRef = useRef<HTMLInputElement>(null)
        const [newNodeText, setNewNodeText] = useState("")

        useEffect(() => {
            if (inputRef.current) inputRef.current.focus()
        }, [])

        const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                editing ? updateNodeLabel(newNodeText) : insertNewNode(newNodeText)
                setShowNewNodeInput(false)
            } else if (event.key === 'Escape') {
                setShowNewNodeInput(false)
            }
        }

        return (
            <div className="fixed inset-0 w-full h-full flex flex-col justify-center items-center gap-2.5 z-20 text-white text-4xl bg-black/50"
                onClick={() => setShowNewNodeInput(false)}>
                <label>{editing ? 'Edit Node:' : 'New Node:'}</label>
                <input className="w-auto max-w-[80vw] bg-black text-blue-300 text-4xl"
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Enter label..."
                    ref={inputRef}
                    value={newNodeText}
                    onChange={(e) => setNewNodeText(e.currentTarget.value)}
                    onKeyDown={handleInputKeyDown}
                />
            </div>
        )
    }

    function handleClose(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        onClose(event)
    }

    return (
        <>
        {showNewNodeInput && <NewNodeInput />}
        {active &&
        <div style={{top: `${posY + window.scrollY-10}px`, left: `${posX + window.scrollX-10}px`}} className="flex flex-col absolute left-[30px] bg-slate-500 z-40"
            onMouseLeave={handleClose} onClick={handleClose}
        >
            <div className="border-2 border-white text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                onClick={() => setShowNewNodeInput(true)}>
                Generate new parent node from selected (alt + w)
            </div>

            <div className=" text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                onClick={() => {deleteSelectedNodes()}}>
                Delete selected nodes (alt + x)
            </div>

            <div className="block text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                onClick={() => {setEditing(true); setShowNewNodeInput(true)}}>
                Edit selected nodes (alt + q)
            </div>

            <div className="block text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                onClick={() => mergeLines()}>
                Merge/Unmerge children
            </div>

            {selectedNodes.length >= 2 ? 
                <div className="block text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                    onClick={() => putArrow()}>
                        Put Arrow
                </div> :
                <div className="block text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300"
                    onClick={() => removeArrow()}>
                    Remove arrows
                </div>}
        </div>}
        </>
    )
}

export default SyntaxTreeActions