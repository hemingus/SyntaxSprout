import React, { createContext, useState, useContext } from 'react';
import { Theme, DefaultTheme } from './ThemeData'

// Create a ThemeContext with a default value
const ThemeContext = createContext<{
    activeTheme: Theme;
    setActiveTheme: React.Dispatch<React.SetStateAction<Theme>>;
}>({
    activeTheme: DefaultTheme,
    setActiveTheme: () => {},
});

// Create a ThemeProvider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeTheme, setActiveTheme] = useState<Theme>(DefaultTheme);

    return (
        <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);