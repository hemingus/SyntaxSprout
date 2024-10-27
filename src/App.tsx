import MainMenu from './components/MainMenu'
import { SyntaxTreeProvider } from './components/SyntaxTree/SyntaxTreeContext'
import { SettingsProvider } from './components/SyntaxTree/Settings/SettingsContex'
import { ThemeProvider } from './components/SyntaxTree/Theme/ThemeContext'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Tutorial from './components/Tutorial'

function App() {
    return (
        <div className="w-full flex flex-col justify-center">
            <nav className="flex justify-around items-center top-0 left-0 w-full bg-[url('/assets/vines_waterfall_01.png')]">

                <Link className="no-underline" 
                    to="/dashboard">
                    <h2 className="p-2 rounded-xl text-lime-500 bg-gradient-to-b from-green-800 to-black border-solid border-black 
                    hover:from-green-600 hover:to-black">
                        Dashboard
                    </h2>
                </Link>
                <Link className="no-underline" 
                    to="/">
                    <h1 className="px-4 bg-gradient-to-b from-transparent rounded-full to-black w-fit 
                    text-[40px] text-center text-green-800 [-webkit-text-stroke:2px_yellowgreen] shadow-md shadow-green-500">  
                        Syntax Sprout
                    </h1>
                </Link>
                <Link className="no-underline" 
                    to="/tutorial">
                    <h2 className="p-2 rounded-xl text-lime-500 bg-gradient-to-b from-green-800 to-black border-solid border-black
                    hover:from-green-600 hover:to-black">
                        Tutorial
                    </h2>
                </Link>
            </nav>
            <SyntaxTreeProvider>
                <SettingsProvider>
                    <ThemeProvider>
                        <Routes>
                            <Route path="/" element={<MainMenu/>} />
                            <Route path="/dashboard" element={<Dashboard/>} />
                            <Route path="/tutorial" element={<Tutorial/>} />
                        </Routes>                        
                    </ThemeProvider>
                </SettingsProvider>
            </SyntaxTreeProvider>
        </div>
    )
}

export default App
