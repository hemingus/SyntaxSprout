import { Theme, Themes } from './ThemeData'
import { useTheme } from './ThemeContext'


const ThemeSettings = () => {
    const {activeTheme, setActiveTheme} = useTheme()

    return (
        
        <div className="p-4 border-solid border-slate-400 rounded">
            <h2 className="text-white m-1">Theme 🎨🖌️</h2>
            {Themes.map((theme: Theme) => (
            <li
                onClick={() => setActiveTheme(theme)} 
                className={`p-2 rounded list-none m-0.5
                ${theme === activeTheme ? "bg-gradient-to-b from-slate-800 to-green-500" 
                    : "bg-gradient-to-b from-slate-800 to-slate-500"}
                text-white
                cursor-pointer 
                hover:bg-gradient-to-b hover:from-slate-700 hover:to-lime-500`}
                key={theme.name}>
                    {theme.name}
            </li>
            ))}
        </div>
        
    )
}

export default ThemeSettings