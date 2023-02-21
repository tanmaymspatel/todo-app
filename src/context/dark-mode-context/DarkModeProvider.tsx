import React, { useState } from 'react'
import DarkModeContext from './darkMode';

interface darkModeProps {
    children: React.ReactNode
}
/**
 * @returns properties for providing dark mode 
 */
function DarkModeProvider({ children }: darkModeProps) {

    const [darkMode, setDarkMode] = useState(false);

    const ctx = {
        darkMode,
        setDarkMode
    }

    return (
        <DarkModeContext.Provider value={ctx}>
            {children}
        </DarkModeContext.Provider>
    )
};

export default DarkModeProvider;
