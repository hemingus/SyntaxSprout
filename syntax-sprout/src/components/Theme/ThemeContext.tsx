import React, { createContext, useState, useContext } from 'react';
import { Theme, DefaultTheme } from './ThemeData'

// Create a ThemeContext with a default value
const ThemeContext = createContext<{
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}>({
    theme: DefaultTheme,
    setTheme: () => {},
});

// Create a ThemeProvider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(DefaultTheme);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);