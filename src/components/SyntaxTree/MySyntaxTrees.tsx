import SyntaxTreeContext from './SyntaxTreeContext'
import { useContext, useRef } from 'react'
import { TreeNode } from './TreeNode'
import ButtonWithConfirmation from '../ButtonWithConfirmation';
import Tooltip from '../../utils/Tooltip';
import InputCenter from '../InputCenter';
import useLineClamp from 'use-line-clamp';
// import { expectedTree, bigTree } from '../../testcases/TestRoots'

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

    function deleteSyntaxTree(tree: TreeNode, index: number) {
        const updatedTrees = savedTrees.filter(x => x !== tree)
        setSavedTrees(updatedTrees)
        if (tree.id === root.id && savedTrees.length > 1) {
            savedTrees[index-1] ? setRoot(savedTrees[index-1]) : setRoot(savedTrees[index+1])
        }
    }

    function clearAll() {
        setSavedTrees([])
    }

    interface TreeItemProps {
        tree: TreeNode
        index: number
    }

    function TreeItem({tree, index}: TreeItemProps) {
        const ref = useRef<HTMLLIElement>(null);
        const clamps = useLineClamp(ref, { lines: 1 });

        return (
            <li ref={ref}
            className={`line-clamp-1 w-[80vw] sm:w-[250px] flex justify-between gap-2 items-center px-3 rounded list-none 
            ${root.id === tree.id ? "bg-gradient-to-b from-slate-800 to-green-500" 
                : "bg-gradient-to-b from-slate-800 to-slate-500"}
            text-white text-xl font-semibold
            cursor-pointer
            hover:bg-gradient-to-b hover:from-slate-800 hover:to-lime-500
            ${clamps? "grid-rows-2" : "grid-rows-1"}`}
            key={tree.id}
            onClick={() => loadSyntaxTree(tree)}
            >
                <div className="min-w-0 flex items-center justify-center gap-2 p-0 m-0">
                    <p className="text-yellow-400 py-2 m-0" >
                        {`${index+1}. `}
                    </p>
                    <p className="min-w-0 break-words py-2 m-0">
                        {clamps?"true":"false"}
                        {tree.meta?.name! ? tree.meta.name : "(no name)"}
                    </p>
                </div>
                <ButtonWithConfirmation
                    action={() => deleteSyntaxTree(tree, index)}
                    buttonText="🗑"
                    confirmationMessage={`Are you sure you want to delete "${tree.meta?.name || "(no name)"}" ?`}
                    className="ml-auto rounded cursor-pointer border-none text-2xl bg-transparent text-slate-300 hover:text-white"
                    tooltip="delete"
                />
            </li>
        )
    }

    function SavedTreesList() {
        return (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mr-8 my-0">
            {savedTrees.map((tree, index) => (
                <TreeItem key={tree.id} tree={tree} index={index} />
            ))}
        </ul>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center appearGrow">
            <div className="w-full flex flex-row justify-center items-center gap-1 py-2 
            bg-gray-400">
                {/* <button 
                    className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                    onClick={() => setRoot(expectedTree)}>
                    Test expected tree
                </button>
                <button 
                    className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                    onClick={() => setRoot(bigTree)}>
                        Test big tree
                </button> */}
                <button 
                    className="cursor-pointer text-xl bg-slate-800 text-white hover:bg-slate-900"
                    onClick={duplicateSyntaxTree}>Duplicate Current Tree 🗐</button>
                <ButtonWithConfirmation
                    action={() => clearAll()}
                    buttonText="Delete all ❌"
                    confirmationMessage="Are you sure you want to delete all trees ?"
                    className="cursor-pointer text-xl bg-slate-800 text-white hover:bg-slate-900"
                    tooltip="delete ALL"
                />
            </div>
            <h3 className="text-white text-2xl m-2">🌳 My trees 🌳</h3>
                {savedTrees && SavedTreesList()}

        </div>
    )
};

export default MySyntaxTrees