import { useState, useEffect, useContext } from 'react'
import SyntaxTreeContext from './SyntaxTreeContext'
import { TreeNode } from './TreeNode'
import InputCenter from '../InputCenter'

interface SyntaxTreeActionProps {
    active: boolean
    posX: number
    posY: number
    onClose: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

type InputAction = "editNode" | "generateNewParent" | "addNewChild" | "insertNewSibling" | null

const SyntaxTreeActions = ({active, posX, posY, onClose}: SyntaxTreeActionProps) => {
    const {root, setRoot, selectedNodes, setSelectedNodes} = useContext(SyntaxTreeContext)!
    const [inputAction, setInputAction] = useState<InputAction>(null)
    const [undoStack, setUndoStack] = useState<TreeNode[]>([])
    const [redoStack, setRedoStack] = useState<TreeNode[]>([])

    useEffect(() => {
        setUndoStack([])
        setRedoStack([])
    }, [root.id])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (selectedNodes.length >= 1) {
                if (event.altKey && event.key === 'x') {
                    deleteSelectedNodes()
                } 
                else if (event.altKey && event.key === 'w') {
                    if (selectedNodesAreAdjacent()) setInputAction("generateNewParent")
                }
                else if (event.altKey && event.key === 'q') {
                    setInputAction("editNode")
                }
                else if (event.altKey && event.key === 'a') {
                    setInputAction("addNewChild")
                }
                else if (event.altKey && event.key === 's') {
                    setInputAction("insertNewSibling")
                }

            }
            if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z') {
                redo()
            }
            else if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
                redo()
            }
            else if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
                undo()
            }

        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedNodes])

    const deepCopyTree = (tree: TreeNode): TreeNode => {
        return tree.deepCopy()
    }

    const updateRoot = (oldRoot: TreeNode) => {
        setUndoStack([...undoStack, deepCopyTree(oldRoot)])
        setRedoStack([])
        setRoot(deepCopyTree(root))
        setSelectedNodes([])
    }

    // Undo function
    const undo = () => {
        console.log("undo")
        if (undoStack.length > 0) {
            const previousState = undoStack.pop()
            if (previousState) {
                setRedoStack([...redoStack, deepCopyTree(root)])
                setRoot(previousState)
                setUndoStack([...undoStack])
            }
        }
    }

    // Redo function
    const redo = () => {
        console.log("redo")
        if (redoStack.length > 0) {
            const nextState = redoStack.pop()
            if (nextState) {
                setUndoStack([...undoStack, deepCopyTree(root)])
                setRoot(nextState)
                setRedoStack([...redoStack])
            }
        }
    }

    function putArrow(): void {
        if (selectedNodes.length >= 2) {
            const newTargets = []
            for (let i = 1; i < selectedNodes.length; i++) {
                newTargets.push(selectedNodes[i].id)
            }
            const arrowTargets = selectedNodes[0].meta?.arrows ? [...selectedNodes[0].meta!.arrows!, ...newTargets] : newTargets
            selectedNodes[0].setMeta({...selectedNodes[0].meta, arrows: arrowTargets})
            updateRoot(root)
        }   
    }

    function removeArrow(): void {
        const oldRoot = deepCopyTree(root)
        selectedNodes.forEach((node) => node.setMeta({...node.meta, arrows: undefined}))
        updateRoot(oldRoot)    
    }

    function mergeLines(): void {
        const oldRoot = deepCopyTree(root)
        selectedNodes.forEach(node => {node.meta?.merged ? node.setMeta({...node.meta, merged: !node.meta!.merged}) : node.setMeta({...node.meta, merged: true})})
        updateRoot(oldRoot)
    }

    function deleteSelectedNodes() {
        const oldRoot = deepCopyTree(root)
        selectedNodes.forEach(node => {if (node.parent) root.deleteNodeById(node.id)})
        updateRoot(oldRoot)
    }

    function editSelectedNodes(text: string) {
        const oldRoot = deepCopyTree(root)
        selectedNodes.forEach(node => node.setLabel(text))
        updateRoot(oldRoot)
    }

    function addChildToNodes(text: string) {
        const oldRoot = deepCopyTree(root)
        selectedNodes.forEach(node => node.addChild(new TreeNode(text, undefined, node)))
        updateRoot(oldRoot)
    }

    function insertNodeAtIndex(text: string) {
        const oldRoot = deepCopyTree(root)
        selectedNodes.forEach(node => {
            if (node.parent?.children) {
                const nodeToInsert: TreeNode = new TreeNode(text, undefined, node.parent)
                const insertAtIndex: number = node.parent.children.indexOf(node)
                node.parent.insertChild(nodeToInsert, insertAtIndex)
            }
        })
        updateRoot(oldRoot)
    }

    function selectedNodesHasSameParent(): boolean {
        if (selectedNodes.length < 1) {
            return false
        }
        const parentId = selectedNodes[0].parent?.id
        return selectedNodes.every((node) => node.parent && node.parent.id === parentId)
    }

    function selectedNodesAreAdjacent(): boolean {
        if (!selectedNodesHasSameParent()) {
            return false
        }
        let indexLow = selectedNodes[0].parent!.children!.length-1
        let indexHigh = 0
        for (let i = 0; i < selectedNodes[0].parent!.children!.length; i++) {
            let nodeIndex = selectedNodes[0].parent!.children!.indexOf(selectedNodes[i])
            console.log(`nodeIndex: ${nodeIndex}`)
            if (nodeIndex > indexHigh) {
                indexHigh = nodeIndex
            }
            if (nodeIndex >= 0 && nodeIndex < indexLow) {
                indexLow = nodeIndex
            }
        } 
        // if difference between highest and lowest index in the children array 
        // is equal to steps apart (number of selected nodes -1) then the selected nodes must be adjacent
        return (indexHigh - indexLow === selectedNodes.length-1)
    }

    function insertNewNode(text: string) {
        if (selectedNodesAreAdjacent()) {
            const oldRoot = deepCopyTree(root)
            selectedNodes.sort((a, b) => a.parent!.children!.indexOf(a) - b.parent!.children!.indexOf(b))
            root.generateParentFromChildren(selectedNodes, text)
            updateRoot(oldRoot)
        }
    }

    function handleClose(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        onClose(event)
    }

    const showInput = () => {
        switch (inputAction) {
            case "editNode": 
                return <InputCenter label="Edit Node:" placeholder="Enter label..." isVisible={true} onConfirm={editSelectedNodes} onCancel={() => setInputAction(null)}/>
            case "generateNewParent":
                return <InputCenter label="New Node:" placeholder="Enter label..." isVisible={true} onConfirm={insertNewNode} onCancel={() => setInputAction(null)}/>
            case "addNewChild":
                return <InputCenter label="New Node:" placeholder="Enter label..." isVisible={true} onConfirm={addChildToNodes} onCancel={() => setInputAction(null)}/>
            case "insertNewSibling":
                return <InputCenter label="New Node:" placeholder="Enter label..." isVisible={true} onConfirm={insertNodeAtIndex} onCancel={() => setInputAction(null)}/>
        }
    }

    return (
        <>
        {showInput()}
        {active &&
        <div style={{top: `${posY + window.scrollY-10}px`, left: `${posX + window.scrollX-10}px`}} className="flex flex-col absolute left-[30px] bg-slate-500 z-40"
            onMouseLeave={handleClose} onClick={handleClose}
        >
            <div className="border-2 border-white text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                onClick={() => setInputAction("generateNewParent")}>
                Generate new parent node from selected (alt + w)
            </div>

            <div className="border-2 border-white text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                onClick={() => setInputAction("addNewChild")}>
                Add child node (alt + a)
            </div>

            <div className="border-2 border-white text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                onClick={() => setInputAction("insertNewSibling")}>
                Insert node (alt + s)
            </div>

            <div className=" text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                onClick={() => {deleteSelectedNodes()}}>
                Delete selected nodes (alt + x)
            </div>

            <div className="block text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                onClick={() => setInputAction("editNode")}>
                Edit selected nodes (alt + q)
            </div>

            <div className="block text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                onClick={() => mergeLines()}>
                Merge / Unmerge children
            </div>

            {selectedNodes.length >= 2 && 
                <div className="block text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                    onClick={() => putArrow()}>
                    Put Arrow
                </div>}
            <div className="block text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300"
                onClick={() => removeArrow()}>
                Remove arrow
            </div>
        </div>}
        </>
    )
}

export default SyntaxTreeActions