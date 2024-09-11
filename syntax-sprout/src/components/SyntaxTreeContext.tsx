import { useState, useEffect, createContext, ReactNode, SetStateAction, Dispatch } from 'react'
import { TreeNode } from './TreeNode' 

interface SyntaxTreeContextProps {
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
    const [root, setRoot] = useState<TreeNode>(new TreeNode("S", []))
    const [selectedNodes, setSelectedNodes] = useState<TreeNode[]>([])
    const [savedTrees, setSavedTrees] = useState<TreeNode[]>([])

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setSelectedNodes([])
    }, [root])

    useEffect(() => {
        const myTrees = localStorage.getItem('my_trees')
        if (myTrees) {
            try {
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

    useEffect(() => {
        if (!loading) {
            localStorage.setItem('my_trees', JSON.stringify(savedTrees))
        }
       
    }, [savedTrees]);

    const contextValue: SyntaxTreeContextProps = {
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