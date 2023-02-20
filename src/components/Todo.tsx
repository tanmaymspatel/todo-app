import { useContext } from "react";
import DarkModeContext from "../context/dark-mode-context/darkMode";

import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

function Todo() {
    const { darkMode } = useContext(DarkModeContext)
    return (
        <div className={`${darkMode ? "dark-mode" : ""} content-width`}>
            <CreateTodo />
            <TodoList />
        </div>
    )
};

export default Todo;
