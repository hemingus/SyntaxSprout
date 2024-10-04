import SyntaxTreeContext from './SyntaxTreeContext'
import { useState, useContext } from 'react'
import { TreeNode } from './TreeNode'
import ButtonWithConfirmation from '../ButtonWithConfirmation';
import Tooltip from '../../utils/Tooltip';
import InputCenter from '../InputCenter';
import { expectedTree, bigTree } from '../../testcases/TestRoots'

const MySyntaxTrees = () => {
    const { root, setRoot, savedTrees, setSavedTrees } = useContext(SyntaxTreeContext)!
    const [showNewNameInput, setShowNewNameInput] = useState(false)

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

    function changeTreeName(name: string) {
        const newRoot = root.deepCopy()
        const newMeta = {...newRoot.meta, name}
        newRoot.setMeta(newMeta)
        setRoot(newRoot)
    }

    function savedTreesList() {
        return (
        <ul className="flex flex-wrap gap-1 mr-8">
            {savedTrees.map((tree, index) => (
                <li className={`solid p-1 rounded list-none 
                ${root.id === tree.id ? "bg-gradient-to-b from-slate-800 to-green-500" 
                    : "bg-gradient-to-b from-slate-800 to-slate-500"}
                text-white text-xl font-semibold
                cursor-pointer 
                hover:bg-gradient-to-b hover:text-yellow-400`}
                key={tree.id}
                onClick={() => loadSyntaxTree(tree)}
                >      
                    <span className="text-yellow-400 p-1" >                           
                        {`${index+1}. `}
                    </span>
                    {tree.meta?.name! ? tree.meta.name : "(no name)"}
                    
                    <ButtonWithConfirmation
                        action={() => deleteSyntaxTree(tree, index)}
                        buttonText="🗑"
                        confirmationMessage={`Are you sure you want to delete "${tree.meta?.name || "(no name)"}" ?`}
                        className="ml-4 p-1 rounded cursor-pointer border-none text-2xl bg-transparent text-slate-300 hover:text-white"
                        tooltip="delete"
                    />
                </li>
            ))}
        </ul>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center appearGrow">
            <div className="flex flex-row justify-center items-center gap-1 mt-2">
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
                <button 
                    className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                    onClick={duplicateSyntaxTree}>Duplicate Current Tree 🗐</button>
                <ButtonWithConfirmation
                    action={() => clearAll()}
                    buttonText="Delete all ❌"
                    confirmationMessage="Are you sure you want to delete all trees ?"
                    className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                    tooltip="delete ALL"
                />
            </div>
                {savedTrees && savedTreesList()}
            <div className="flex flex-row justify-center items-center gap-2">
                <h1 className="text-yellow-400">
                    {root.meta?.name || "(no name)"}
                </h1>                
                <Tooltip text="edit name">
                <button className="text-lg hover:border-slate-400 cursor-pointer bg-gradient-to-br from-black to-slate-700 rounded-xl"
                    onClick={() => setShowNewNameInput(true)}>
                    ✏️
                </button>
                </Tooltip>
            {showNewNameInput && 
                <InputCenter 
                    label="New name:" 
                    placeholder="enter name..." 
                    isVisible={true} 
                    onConfirm={changeTreeName} 
                    onCancel={() => setShowNewNameInput(false)}/>}
            </div>
        </div>
    )
};

export default MySyntaxTrees