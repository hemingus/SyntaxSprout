import './App.css'
import SyntaxTreePage from './components/SyntaxTreePage/SyntaxTreePage'
import { SyntaxTreeProvider } from "./components/SyntaxTreeContext/SyntaxTreeContext"

function App() {
    return (
        <div className="app">
            <h1 className="main-header">Syntax Sprout</h1>
            <SyntaxTreeProvider>
                <SyntaxTreePage />
            </SyntaxTreeProvider>
        </div>
    )
}

export default App
