import { createContext } from "react";

interface darkMode {
    darkMode: boolean; setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const DarkModeContext = createContext<darkMode>({
    darkMode: false,
    setDarkMode: () => { }
});

export default DarkModeContext;