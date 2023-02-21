import { useContext } from "react";

import DarkModeContext from "../../context/dark-mode-context/darkMode";
import darkModeImg from '../../assets/images/icon-moon.svg'
import lightModeImg from '../../assets/images/icon-sun.svg'

function Header() {

    const { darkMode, setDarkMode } = useContext(DarkModeContext);

    return (
        <header
            id="header"
            className={darkMode ? "light-mode-bg" : "dark-mode-bg"}
        >
            <div
                className="content-width h-100 container"
            >
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className="heading">TODO</h1>
                    <img
                        src={darkMode ? lightModeImg : darkModeImg}
                        alt="dark-mode"
                        className="cursor-pointer"
                        onClick={() => { setDarkMode(prevMode => !prevMode) }}
                    />
                </div>
            </div>
        </header>
    )
};

export default Header;
