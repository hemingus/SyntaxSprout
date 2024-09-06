import { Theme, Themes } from './ThemeData'
import { useTheme } from '../Theme/ThemeContext'


const ThemeSettings = () => {
    const {setTheme} = useTheme()
    return (
        <div>
            <ul>
                {Themes.map((theme: Theme) => (
                <li
                    onClick={() => setTheme(theme)} 
                    className={`solid p-2 m-0 rounded list-none bg-gradient-to-b from-slate-800 to-slate-500
                     text-white
                     cursor-pointer 
                     hover:bg-gradient-to-b hover:from-slate-700 hover:to-lime-500`}
                    key={theme.name}>
                        {theme.name}
                </li>
                ))}
            </ul>
        </div>
    )
}

export default ThemeSettings