import { Theme, Themes } from './ThemeData'
import { useTheme } from '../Theme/ThemeContext'


const ThemeSettings = () => {
    const {setTheme} = useTheme()
    return (
        <div>
            <ul>
                {Themes.map((theme: Theme) => (
                    <li onClick={() => setTheme(theme)} className="solid bg-white text-black cursor-pointer hover:bg-lime-500" key={theme.name}>{theme.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default ThemeSettings