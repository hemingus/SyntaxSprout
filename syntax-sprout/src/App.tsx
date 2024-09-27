import MainMenu from './components/MainMenu'
import { SyntaxTreeProvider } from './components/SyntaxTree/SyntaxTreeContext'
import { SettingsProvider } from './components/SyntaxTree/Settings/SettingsContex'
import { ThemeProvider } from './components/SyntaxTree/Theme/ThemeContext'

function App() {
    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-center top-0 left-0 w-full bg-[url('./assets/vines_waterfall_01.png')]">   
                <h1 className="px-4 bg-gradient-to-b from-transparent rounded-full to-black w-fit 
                text-[40px] text-center text-green-800 [-webkit-text-stroke:2px_yellowgreen] shadow-md shadow-green-500">  
                    Syntax Sprout
                </h1>
            </div>
            <SyntaxTreeProvider>
                <SettingsProvider>
                    <ThemeProvider>
                        <MainMenu />
                    </ThemeProvider>
                </SettingsProvider>
            </SyntaxTreeProvider> 
        </div>
    )
}

export default App
