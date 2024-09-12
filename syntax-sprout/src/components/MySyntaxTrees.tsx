import SyntaxTreeContext from './SyntaxTreeContext'
import { useEffect, useContext } from 'react'
import { TreeNode } from './TreeNode'
import Tooltip from '../utils/Tooltip'

type SavedTree = {
    name: string
    tree: TreeNode
}

const MySyntaxTrees = () => {
    const { root, setRoot, savedTrees, setSavedTrees } = useContext(SyntaxTreeContext)!



    function updateSyntaxTree(updatedTree: TreeNode) {
        const treeIndex = savedTrees.findIndex(tree => tree.id === updatedTree.id);

        if (treeIndex !== -1) {
            // Create a copy of the savedTrees array
            const updatedSavedTrees = [...savedTrees];
    
            // Replace the tree at the found index with the updated tree
            updatedSavedTrees[treeIndex] = updatedTree;
    
            // Update state with the modified array
            
        }
    }

    function duplicateSyntaxTree() {
        if (savedTrees.length >= 5) {
            alert("max 5 saves")
        } else {
            const newTree = root.deepClone()
            setRoot(newTree)
            setSavedTrees([...savedTrees, newTree])
            
            console.log(newTree)
            console.log('Tree saved to local storage')
        }
    }

    function loadSyntaxTree(tree: TreeNode) {
        console.log(tree)
        setRoot(tree)
        console.log('Tree loaded from local storage')
    }

    function deleteSyntaxTree(tree: TreeNode) {
        const updatedTrees = savedTrees.filter(x => x !== tree)
        setSavedTrees(updatedTrees)
        if (savedTrees.length > 0) {
            setRoot(savedTrees[0])
        }
    }

    function clearAll() {
        setSavedTrees([])
    }

    function savedTreesList() {
        return (
        <ul className="flex flex-wrap gap-1">
            {savedTrees.map((tree, index) => (
                <li className={`solid p-2 m-0 rounded list-none 
                ${root.id === tree.id ? "bg-gradient-to-b from-slate-800 to-green-500" 
                    : "bg-gradient-to-b from-slate-800 to-slate-500"}
                text-white 
                cursor-pointer 
                hover:bg-gradient-to-b hover:from-slate-700 hover:to-lime-500`}
                key={tree.id}
                onClick={() => loadSyntaxTree(tree)}
                >
                    {index +1} {tree.id}
                    <Tooltip text="delete">
                        <span 
                            className="ml-4 p-1 rounded cursor-pointer text-xl bg-transparent text-white hover:" 
                            onClick={() => deleteSyntaxTree(tree)}
                            >❌</span>
                    </Tooltip>
                </li>
            ))}
        </ul>
        )
    }

    return (
        <div>
            <button 
                className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                onClick={duplicateSyntaxTree}>Duplicate Current Tree</button>
            <button 
                className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                onClick={clearAll}>Clear All</button>
            {savedTrees && savedTreesList()}
        </div>
    )
};

export default MySyntaxTrees