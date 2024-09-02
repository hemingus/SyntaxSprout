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

    useEffect(() => {
        const savedTrees = localStorage.getItem('my_trees');
        if (savedTrees) {
            const parsedTrees = JSON.parse(savedTrees);
            const loadedTrees = parsedTrees.map((treeData: any) => TreeNode.fromJSON(treeData));
            setSavedTrees(loadedTrees);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('my_trees', JSON.stringify(savedTrees))
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