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
        <div className="main-menu text-xl">
            <div className="flex flex-row justify-center items-center">
                <label className="text-xl">Generate syntax tree from a sentence ⏵ </label>
                <button className="text-xl bg-green-900 hover:text-white text-slate-300 cursor-pointer" onClick={() => setShowSyntaxTree(true)}>Syntax Tree Generator</button>
                    
            </div>
            <div className="flex flex-row justify-center items-center">
                <label className="text-xl">Freely generate a tree model ⏵ </label>
                <button className="text-xl bg-green-900 hover:text-white text-slate-300 cursor-pointer">Custom Tree Generator</button>
            </div>
        </div>
    )
}

export default MainMenu