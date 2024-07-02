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
            <div style={{width: "fit-content", alignSelf: "center"}}>
            <div className="flex-container">
                <label>Generate syntax tree from a sentence ⏵ </label>
                <button onClick={() => setShowSyntaxTree(true)}>Syntax Tree Generator</button>
            </div>
            <div className="flex-container">
                <label>Freely generate a tree model ⏵ </label>
                <button>Custom Tree Generator</button>
            </div>
            </div>
        </div>
    )
}

export default MainMenu