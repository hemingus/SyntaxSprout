import { useState, useRef, useEffect, createContext, ReactNode, SetStateAction, Dispatch } from 'react'
import { TreeNode } from './TreeNode' 
import { placeholderTree } from '../../testcases/TestRoots'

interface SyntaxTreeContextProps {
    syntaxTreeRef: React.RefObject<HTMLDivElement>
    root: TreeNode
    setRoot: Dispatch<SetStateAction<TreeNode>>
    selectedNodes: TreeNode[]
    setSelectedNodes: Dispatch<SetStateAction<TreeNode[]>>
    savedTrees: TreeNode[]
    setSavedTrees: Dispatch<SetStateAction<TreeNode[]>>
}

interface SyntaxTreeProviderProps {
    children: ReactNode
}

const SyntaxTreeContext = createContext<SyntaxTreeContextProps | undefined>(undefined);

export const SyntaxTreeProvider: React.FC<SyntaxTreeProviderProps> = ({ children }) => {
    const syntaxTreeRef = useRef<HTMLDivElement>(null);
    const [root, setRoot] = useState<TreeNode>(placeholderTree)
    const [selectedNodes, setSelectedNodes] = useState<TreeNode[]>([])
    const [savedTrees, setSavedTrees] = useState<TreeNode[]>([])

    const [loading, setLoading] = useState<boolean>(true)

    // Clear all selected nodes after changing or modifying current tree.
    useEffect(() => {
        setSelectedNodes([])
    }, [root])

    // Update tree object in savedTrees on change.
    useEffect(() => {
        if (!root) return;
        const updatedTrees = savedTrees.map(tree =>
            tree.id === root.id ? root.deepCopy() : tree
        );
        setSavedTrees(updatedTrees);
    }, [root]);

    // Load tree data from local storage on mount.
    useEffect(() => {
        const myTrees = localStorage.getItem('my_trees')
        if (myTrees) {
            try {
                console.log(myTrees)
                const parsedTrees = JSON.parse(myTrees)
                if (Array.isArray(parsedTrees)) {
                    const loadedTrees = parsedTrees.map((treeData: any) => TreeNode.fromJSON(treeData))
                    setSavedTrees(loadedTrees)
                    console.log(loadedTrees)
                }
            } catch (error) {
                console.error('Error parsing saved trees from localStorage:', error)
            }
        } else {
            console.log("'my_trees' does not exist in local storage.")
            setSavedTrees([])
        }
        setLoading(false)
    }, [])

    // Update local storage when savedTrees changes.
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('my_trees', JSON.stringify(savedTrees))
        }
       
    }, [savedTrees]);

    const contextValue: SyntaxTreeContextProps = {
        syntaxTreeRef,
        root, 
        setRoot,
        selectedNodes,
        setSelectedNodes,
        savedTrees,
        setSavedTrees
    }

    return (
        <SyntaxTreeContext.Provider value={contextValue}>
            {children}
        </SyntaxTreeContext.Provider>
    )
}

export default SyntaxTreeContext