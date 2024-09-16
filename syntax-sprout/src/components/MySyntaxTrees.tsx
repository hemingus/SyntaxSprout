import SyntaxTreeContext from './SyntaxTreeContext'
import { useContext } from 'react'
import { TreeNode } from './TreeNode'
import Tooltip from '../utils/Tooltip'

const MySyntaxTrees = () => {
    const { root, setRoot, savedTrees, setSavedTrees } = useContext(SyntaxTreeContext)!

    function duplicateSyntaxTree() {
        const newTree = root.deepClone()
        setRoot(newTree)
        setSavedTrees([...savedTrees, newTree])
    }

    function loadSyntaxTree(tree: TreeNode) {
        setRoot(tree)
    }

    function deleteSyntaxTree(tree: TreeNode) {
        const updatedTrees = savedTrees.filter(x => x !== tree)
        setSavedTrees(updatedTrees)
        if (tree.id === root.id && savedTrees.length > 0) {
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
                            className="ml-4 p-1 rounded cursor-pointer text-xl bg-transparent text-white"
                            onClick={(e) => {e.stopPropagation(); deleteSyntaxTree(tree)}}
                            >❌</span>
                    </Tooltip>
                </li>
            ))}
        </ul>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-2">
                <button 
                    className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                    onClick={duplicateSyntaxTree}>Duplicate Current Tree</button>
                <button 
                    className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                    onClick={clearAll}>Clear All</button>
            </div>
                {savedTrees && savedTreesList()}
            
        </div>
    )
};

export default MySyntaxTrees