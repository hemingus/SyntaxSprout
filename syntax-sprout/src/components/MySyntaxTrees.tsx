import SyntaxTreeContext from './SyntaxTreeContext'
import { useContext } from 'react'
import { TreeNode } from './TreeNode'

const MySyntaxTrees = () => {
    const { root, setRoot, savedTrees, setSavedTrees } = useContext(SyntaxTreeContext)!

    function saveSyntaxTree() {
        if (savedTrees.length >= 5) {
            alert("max 5 saves")
        } else {
            const newTree = root.clone()
            setSavedTrees([...savedTrees, newTree])
            console.log('Tree saved to local storage')
        }
    }

    function loadSyntaxTree(tree: TreeNode) {
        setRoot(tree)
        console.log('Tree loaded from local storage')
    }

    function clearAll() {
        setSavedTrees([])
    }

    function savedTreesList() {
        return (
        <ul>
            {savedTrees.map((tree) => (
                <li className="text-white list-none" key={tree.name}>
                    {tree.name}
                    <button onClick={() => loadSyntaxTree(tree)}>Load</button>
                </li>
            ))}
        </ul>
        )
    }

    return (
        <div>
            <button onClick={saveSyntaxTree}>Save Current Tree</button>
            <button onClick={clearAll}>Clear All</button>
            {savedTrees && savedTreesList()}
        </div>
    )
};

export default MySyntaxTrees