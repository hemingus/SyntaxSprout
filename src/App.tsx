import MainMenu from './components/MainMenu'
import { SyntaxTreeProvider } from './components/SyntaxTree/SyntaxTreeContext'
import { SettingsProvider } from './components/SyntaxTree/Settings/SettingsContex'
import { ThemeProvider } from './components/SyntaxTree/Theme/ThemeContext'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Tutorial from './components/Tutorial'
import AboutPage from './components/AboutPage'
import Navbar from './components/Navbar'

function App() {
    return (
        <div className="w-full flex flex-col justify-center">
            <div className="flex flex-col justify-around items-center top-0 left-0 w-full bg-[url('/assets/vines_waterfall_01.png')]">
                    <Link className="no-underline" 
                        to="/">
                        <h1 className="mb-0 px-4 bg-gradient-to-b from-transparent rounded-full to-black w-fit 
                        text-4xl xs:text-[40px] text-center text-green-800 [-webkit-text-stroke:2px_yellowgreen] shadow-md shadow-green-500">  
                            Syntax Sprout
                        </h1>
                    </Link>
                    <Navbar />
            </div>
            <SyntaxTreeProvider>
                <SettingsProvider>
                    <ThemeProvider>
                        <Routes>
                            <Route path="/" element={<MainMenu/>} />
                            <Route path="/dashboard" element={<Dashboard/>} />
                            <Route path="/tutorial" element={<Tutorial/>} />
                            <Route path="/about" element={<AboutPage/>}  />
                        </Routes>                        
                    </ThemeProvider>
                </SettingsProvider>
            </SyntaxTreeProvider>
        </div>
    )
}

export default App
