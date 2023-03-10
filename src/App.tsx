import { useContext } from "react";

import Todo from "./components/Todo";
import DarkModeContext from "./context/dark-mode-context/darkMode";
import Header from "./core/components/Header";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="h-100 d-flex flex-column">
      <Header />
      <main className={`${darkMode ? "dark-mode" : ""} main-content flex-grow-1`}>
        <Todo />
      </main>
    </div>
  );
};

export default App;
