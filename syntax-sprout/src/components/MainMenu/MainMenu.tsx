import "./MainMenu.css"
import SyntaxTreePage from '../SyntaxTreePage/SyntaxTreePage'
import { SyntaxTreeProvider } from "../SyntaxTreeContext/SyntaxTreeContext"
import { useState } from 'react'

const MainMenu : React.FC = () => {
    const [showSyntaxTree, setShowSyntaxTree] = useState(false)

    if (showSyntaxTree) {
        return (
            <SyntaxTreeProvider>
                <SyntaxTreePage />
            </SyntaxTreeProvider>
        )
    }

    return (
        <div className="main-menu">
            <div className="flex flex-col items-end">
                <label className="h-6">Generate syntax tree from a sentence ⏵ </label>
                <label className="h-6">Freely generate a tree model ⏵ </label>    
            </div>
            <div className="flex flex-col items-start">
                <button className="h-6" onClick={() => setShowSyntaxTree(true)}>Syntax Tree Generator</button>
                <button className="h-6">Custom Tree Generator</button>
            </div>
        </div>
    )
}

export default MainMenu