import SyntaxTreeContext from './SyntaxTreeContext'
import { useContext } from 'react'
import { TreeNode } from './TreeNode'

type SavedTree = {
    name: string
    tree: TreeNode
}

const MySyntaxTrees = () => {
    const { root, setRoot, savedTrees, setSavedTrees } = useContext(SyntaxTreeContext)!

    function saveSyntaxTree() {
        if (savedTrees.length >= 5) {
            alert("max 5 saves")
        } else {
            const newTree = root.deepClone()
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

    function clearAll() {
        setSavedTrees([])
    }

    function savedTreesList() {
        return (
        <ul>
            {savedTrees.map((tree, index) => (
                <li className="solid p-2 m-0 rounded list-none bg-gradient-to-b from-slate-800 to-slate-500
                text-white 
                cursor-pointer 
                hover:bg-gradient-to-b hover:from-slate-700 hover:to-lime-500" 
                key={tree.id}
                onClick={() => loadSyntaxTree(tree)}>
                    {index +1} {tree.id}
                </li>
            ))}
        </ul>
        )
    }

    return (
        <div>
            <button 
                className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                onClick={saveSyntaxTree}>Save Current Tree</button>
            <button 
                className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                onClick={clearAll}>Clear All</button>
            {savedTrees && savedTreesList()}
        </div>
    )
};

export default MySyntaxTrees