import SyntaxTreeContext from './SyntaxTreeContext'
import { useState, useContext } from 'react'
import { TreeNode } from '../TreeNode'
import Tooltip from '../../utils/Tooltip'
import ConfirmationDialog from '../ConfirmationDialog';
import ButtonWithConfirmation from '../ButtonWithConfirmation';

const MySyntaxTrees = () => {
    const { root, setRoot, savedTrees, setSavedTrees } = useContext(SyntaxTreeContext)!
    const [dialogVisible, setDialogVisible] = useState(false)

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
        setDialogVisible(false)
    }

    function savedTreesList() {
        return (
        <ul className="flex flex-wrap gap-1">
            {savedTrees.map((tree, index) => (
                <li className={`solid p-2 m-0 rounded list-none 
                ${root.id === tree.id ? "bg-gradient-to-b from-slate-800 to-green-500" 
                    : "bg-gradient-to-b from-slate-800 to-slate-500"}
                text-white text-lg font-semibold
                cursor-pointer 
                hover:bg-gradient-to-b hover:text-yellow-400`}
                key={tree.id}
                onClick={() => loadSyntaxTree(tree)}
                >      
                    <span className="text-yellow-400" >                           
                        {`${index+1}. `}
                    </span>
                    {tree.meta?.name! ? tree.meta.name : "Syntax Tree (no name)"}
                    
                    <ButtonWithConfirmation
                        action={() => deleteSyntaxTree(tree, index)}
                        buttonText="❌"
                        confirmationMessage={`Are you sure you want to delete "${tree.meta?.name || "this syntax tree"}"?`}
                        className="ml-4 p-1 rounded cursor-pointer text-xl bg-transparent text-white"
                        tooltip="delete"
                    />
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
                    onClick={() => setDialogVisible(true)}>Clear All</button>
                <ConfirmationDialog
                        message="Are you sure you want to delete all trees?"
                        isVisible={dialogVisible}
                        onConfirm={clearAll}
                        onCancel={() => setDialogVisible(false)}
                    />
            </div>
                {savedTrees && savedTreesList()}
            
        </div>
    )
};

export default MySyntaxTrees