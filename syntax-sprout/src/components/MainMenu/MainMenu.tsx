import "./MainMenu.css"
import SyntaxTreePage from '../SyntaxTreePage/SyntaxTreePage'
import { SyntaxTreeProvider } from "../SyntaxTreeContext"
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
            <div className="flex flex-col justify-center items-center solid bg-slate-700 p-4">
                <p className="text-white">
                    Welcome to Syntax Sprout! 
                    <br/> If you are analyzing sentences and are looking to construct a syntax tree, 
                    <br/> here is a neat tool to help you accomplish that.
                    <br/> Enter your sentence and start building!
                </p>
                <button 
                    className="text-xl bg-green-900 text-slate-300 cursor-pointer hover:text-white" 
                    onClick={() => setShowSyntaxTree(true)}>
                        Start building! ⏵
                </button>
            </div>
        </div>
    )
}

export default MainMenu