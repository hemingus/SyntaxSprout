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
                    deleteNodes()
                } 
                else if (event.altKey && event.key === 'w') {
                    setInputAction("generateNewParent")
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
            const oldRoot = deepCopyTree(root)
            const newTargets = []
            for (let i = 1; i < selectedNodes.length; i++) {
                newTargets.push(selectedNodes[i].id)
            }
            const arrowTargets = selectedNodes[0].meta?.arrows ? [...selectedNodes[0].meta!.arrows!, ...newTargets] : newTargets
            selectedNodes[0].setMeta({...selectedNodes[0].meta, arrows: arrowTargets})
            updateRoot(oldRoot)
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

    function deleteNodes() {
        const oldRoot = deepCopyTree(root)
        selectedNodes.forEach(node => {if (node.parent) root.deleteNodeById(node.id)})
        updateRoot(oldRoot)
    }

    function editNodes(text: string) {
        const oldRoot = deepCopyTree(root)
        selectedNodes.forEach(node => node.setLabel(text))
        updateRoot(oldRoot)
    }

    function addNewChildNode(text: string) {
        const oldRoot = deepCopyTree(root)
        selectedNodes.forEach(node => node.addChild(new TreeNode(text, undefined, node)))
        updateRoot(oldRoot)
    }

    function insertNewNode(text: string) {
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

    // Function needed when generating nodes from selected to prevent breaking the tree-graph.
    function groupNodes(nodes: TreeNode[]): TreeNode[][] {
        // Step 1: Group nodes by their parent
        const groups: Map<TreeNode, TreeNode[]> = new Map()
        nodes.forEach(node => {
            const parent = node.parent
            if (parent) {
                if (!groups.has(parent)) {
                    groups.set(parent, [])
                }
                groups.get(parent)!.push(node)
            }
        })
         // Step 2: Split non-adjacent nodes and sort by index in parent's children
        const result: TreeNode[][] = []
        groups.forEach((nodesWithSameParent, parent) => {
          // Ensure the parent has a defined `children` array, which should be the case
            const parentChildren = parent.children ?? []
        
            // Sort the nodes based on their index in the parent's children array
            nodesWithSameParent.sort(
                (a, b) => parentChildren.indexOf(a) - parentChildren.indexOf(b)
            );
    
            let currentGroup: TreeNode[] = [nodesWithSameParent[0]] // Start with the first node in the sorted array
            for (let i = 1; i < nodesWithSameParent.length; i++) {
                const prevNode = nodesWithSameParent[i - 1]
                const currentNode = nodesWithSameParent[i]
        
                // If the current node is not adjacent to the previous one, create a new group
                if (parentChildren.indexOf(currentNode) !== parentChildren.indexOf(prevNode) + 1) {
                    result.push(currentGroup) // Push the previous group to the result
                    currentGroup = [] // Start a new group
                }
        
                currentGroup.push(currentNode)// Add current node to the group
            }
            result.push(currentGroup)
        })
        return result
    }


    function generateNewParentNode(text: string) {
        const groups = groupNodes(selectedNodes)
        const oldRoot = deepCopyTree(root)
        groups.forEach(children => root.generateParentFromChildren(children, text))
        updateRoot(oldRoot)
    }

    function handleClose(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        onClose(event)
    }

    const showInput = () => {
        switch (inputAction) {
            case "editNode": 
                return <InputCenter label="Edit Node:" placeholder="Enter label..." isVisible={true} onConfirm={editNodes} onCancel={() => setInputAction(null)}/>
            case "generateNewParent":
                return <InputCenter label="New Node:" placeholder="Enter label..." isVisible={true} onConfirm={generateNewParentNode} onCancel={() => setInputAction(null)}/>
            case "addNewChild":
                return <InputCenter label="New Node:" placeholder="Enter label..." isVisible={true} onConfirm={addNewChildNode} onCancel={() => setInputAction(null)}/>
            case "insertNewSibling":
                return <InputCenter label="New Node:" placeholder="Enter label..." isVisible={true} onConfirm={insertNewNode} onCancel={() => setInputAction(null)}/>
        }
    }

    return (
        <>
        {showInput()}
        {active &&
        <div style={{top: `${posY + window.scrollY-10}px`, left: `${posX + window.scrollX-10}px`}} 
            className="flex flex-col absolute left-[30px] bg-slate-600 z-40 border-solid border-black"
            onMouseLeave={handleClose} onClick={handleClose}
        >
            <div className="border border-solid border-black text-white cursor-pointer p-[5px] hover:bg-slate-700 hover:text-emerald-300" 
                onClick={() => setInputAction("generateNewParent")}>
                Generate new parent node from selected <span className="text-sky-300">(alt + w)</span>
            </div>

            <div className="border border-solid border-black text-white cursor-pointer p-[5px] hover:bg-slate-700 hover:text-emerald-300" 
                onClick={() => setInputAction("addNewChild")}>
                Add child node <span className="text-sky-300">(alt + a)</span>
            </div>

            <div className="border border-solid border-black text-white cursor-pointer p-[5px] hover:bg-slate-700 hover:text-emerald-300" 
                onClick={() => setInputAction("insertNewSibling")}>
                Insert node <span className="text-sky-300">(alt + s)</span>
            </div>

            <div className="border border-solid border-black text-white cursor-pointer p-[5px] hover:bg-slate-700 hover:text-emerald-300" 
                onClick={() => {deleteNodes()}}>
                Delete selected nodes <span className="text-sky-300">(alt + x)</span>
            </div>

            <div className="border border-solid border-black text-white cursor-pointer p-[5px] hover:bg-slate-700 hover:text-emerald-300" 
                onClick={() => setInputAction("editNode")}>
                Edit selected nodes <span className="text-sky-300">(alt + q)</span>
            </div>

            <div className="border border-solid border-black text-white cursor-pointer p-[5px] hover:bg-slate-700 hover:text-emerald-300" 
                onClick={() => mergeLines()}>
                Merge / Unmerge children
            </div>

            <div className="border border-solid border-black text-white cursor-pointer p-[5px] hover:bg-slate-700 hover:text-emerald-300" 
                onClick={() => putArrow()}>
                Put Arrow
            </div>

            <div className="border border-solid border-black text-white cursor-pointer p-[5px] hover:bg-slate-700 hover:text-emerald-300"
                onClick={() => removeArrow()}>
                Remove arrow
            </div>
        </div>}
        </>
    )
}

export default SyntaxTreeActions