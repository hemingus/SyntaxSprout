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

type InputAction = "editNode" | "generateFromChildren" | "addChild" | null

const SyntaxTreeActions = ({active, posX, posY, onClose}: SyntaxTreeActionProps) => {
    const {root, setRoot, selectedNodes, setSelectedNodes} = useContext(SyntaxTreeContext)!
    const [inputAction, setInputAction] = useState<InputAction>(null)

    const showInput = () => {
        switch (inputAction) {
            case "editNode": 
                return <InputCenter label="Edit Node::" placeholder="Enter label..." isVisible={true} onConfirm={editSelectedNodes} onCancel={() => setInputAction(null)}/>
            case "generateFromChildren":
                return <InputCenter label="New Node:" placeholder="Enter label..." isVisible={true} onConfirm={insertNewNode} onCancel={() => setInputAction(null)}/>
            case "addChild":
                return <InputCenter label="New Node:" placeholder="Enter label..." isVisible={true} onConfirm={addChildToNodes} onCancel={() => setInputAction(null)}/>
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (selectedNodes.length >= 1) {
                if (event.altKey && event.key === 'x') {
                    deleteSelectedNodes()
                } 
                else if (event.altKey && event.key === 'w') {
                    setInputAction("generateFromChildren")
                }
                else if (event.altKey && event.key === 'q') {
                    setInputAction("editNode")
                }
                else if (event.altKey && event.key === 'a') {
                    setInputAction("addChild")
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
            const newTargets = []
            for (let i = 1; i < selectedNodes.length; i++) {
                newTargets.push(selectedNodes[i].id)
            }
            const arrowTargets = selectedNodes[0].meta?.arrows ? [...selectedNodes[0].meta!.arrows!, ...newTargets] : newTargets
            selectedNodes[0].setMeta({...selectedNodes[0].meta, arrows: arrowTargets})
            refreshRoot()
            setSelectedNodes([])
        }   
    }

    function removeArrow(): void {
        selectedNodes.forEach((node) => node.setMeta({...node.meta, arrows: undefined}))
        refreshRoot()
        setSelectedNodes([])     
    }

    function mergeLines(): void {
        selectedNodes.forEach(node => {node.meta?.merged ? node.setMeta({merged: !node.meta!.merged}) : node.setMeta({merged: true})})
        refreshRoot()
        setSelectedNodes([])
    }

    function deleteSelectedNodes() {
        selectedNodes.forEach(node => {if (node.parent) root.deleteNodeById(node.id)})
        refreshRoot()
        setSelectedNodes([])
    }

    function editSelectedNodes(text: string) {
        selectedNodes.forEach(node => node.setLabel(text))
        refreshRoot()
        setSelectedNodes([])
    }

    function addChildToNodes(text: string) {
        selectedNodes.forEach(node => node.addChild(new TreeNode(text, undefined, node)))
        refreshRoot()
        setSelectedNodes([])
    }

    function selectedNodesHasSameParent(): boolean {
        if (selectedNodes.length < 1) {
            return false
        }
        const parentId = selectedNodes[0].parent?.id
        selectedNodes.forEach((node) => {if (node.parent!.id !== parentId) return false})
        return true
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
            console.log("true")
            selectedNodes.sort((a, b) => a.parent!.children!.indexOf(a) - b.parent!.children!.indexOf(b))
            console.log(selectedNodes)
            const newRoot = root.clone()
            newRoot.generateParentFromChildren(selectedNodes, text)
            setSelectedNodes([])
            setRoot(newRoot)
        }
    }

    function updateNodeLabel(text: string) {
        console.log("updateLabel")
        if (selectedNodes.length >= 1) {
            editSelectedNodes(text)
        }
    }  

    function handleClose(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        onClose(event)
    }

    return (
        <>
        {showInput()}
        {/* {showNewNodeInput && <NewNodeInput />} */}
        {active &&
        <div style={{top: `${posY + window.scrollY-10}px`, left: `${posX + window.scrollX-10}px`}} className="flex flex-col absolute left-[30px] bg-slate-500 z-40"
            onMouseLeave={handleClose} onClick={handleClose}
        >
            <div className="border-2 border-white text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                onClick={() => setInputAction("generateFromChildren")}>
                Generate new parent node from selected (alt + w)
            </div>

            <div className="border-2 border-white text-white cursor-pointer p-[5px] hover:bg-lime-700 hover:text-lime-300" 
                onClick={() => setInputAction("addChild")}>
                Add child node (alt + a)
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