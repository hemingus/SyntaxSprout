import { useState, createContext, ReactNode, SetStateAction, Dispatch } from 'react'
import { TreeNode } from '../TreeNode' 

interface SyntaxTreeContextProps {
    root: TreeNode
    setRoot: Dispatch<SetStateAction<TreeNode>>
}

interface SyntaxTreeProviderProps {
    children: ReactNode
}

const SyntaxTreeContext = createContext<SyntaxTreeContextProps | undefined>(undefined);

export const SyntaxTreeProvider: React.FC<SyntaxTreeProviderProps> = ({ children }) => {
    const [root, setRoot] = useState<TreeNode>(new TreeNode("root"))

    const contextValue: SyntaxTreeContextProps = {
        root, 
        setRoot
    }

    return (
        <SyntaxTreeContext.Provider value={contextValue}>
            {children}
        </SyntaxTreeContext.Provider>
    )
}

export default SyntaxTreeContext