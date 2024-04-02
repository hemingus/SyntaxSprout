import './App.css'
import SyntaxTreePage from './components/SyntaxTreePage/SyntaxTreePage'
import { SyntaxTreeProvider } from "./components/SyntaxTreeContext/SyntaxTreeContext"

function App() {
    return (
        <>
            <SyntaxTreeProvider>
                <h1>Syntax Sprout</h1>
                <SyntaxTreePage />
            </SyntaxTreeProvider>
        </>
    )
}

export default App
