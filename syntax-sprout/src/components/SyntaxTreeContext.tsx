import { useState, createContext, ReactNode, SetStateAction, Dispatch } from 'react'
import { TreeNode } from './TreeNode' 

interface SyntaxTreeContextProps {
    root: TreeNode
    setRoot: Dispatch<SetStateAction<TreeNode>>
    selectedNodes: TreeNode[]
    setSelectedNodes: Dispatch<SetStateAction<TreeNode[]>>
}

interface SyntaxTreeProviderProps {
    children: ReactNode
}

const SyntaxTreeContext = createContext<SyntaxTreeContextProps | undefined>(undefined);

export const SyntaxTreeProvider: React.FC<SyntaxTreeProviderProps> = ({ children }) => {
    const [root, setRoot] = useState<TreeNode>(new TreeNode("S", []))
    const [selectedNodes, setSelectedNodes] = useState<TreeNode[]>([])

    const contextValue: SyntaxTreeContextProps = {
        root, 
        setRoot,
        selectedNodes,
        setSelectedNodes
    }

    return (
        <SyntaxTreeContext.Provider value={contextValue}>
            {children}
        </SyntaxTreeContext.Provider>
    )
}

export default SyntaxTreeContext