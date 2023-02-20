import { useState } from "react";
import utilityServices from "../shared/services/utilityServices";

function CreateTodo() {
    const [todo, setTodo] = useState<string>("");
    const { getMaxId } = utilityServices

    const onEnterClick = (e: any) => {
        if (e.key === "Enter") {
            setTodo(e.target.value)
            const newList = (JSON.parse(localStorage.getItem("todoList") as string))
            newList.push({
                id: getMaxId(newList) + 1,
                todo: todo,
                isCompleted: false
            });
            localStorage.setItem("todoList", JSON.stringify(newList))
            setTodo("");
        }

    }
    return (
        <div className="container todo-container">
            <div className="input-container d-flex align-items-center padding border shadow-sm">
                <label htmlFor="todo" className="round-check"></label>
                <input
                    type="text"
                    name="todo"
                    id="todo"
                    onKeyDown={(e) => onEnterClick(e)}
                    onChange={(e) => setTodo(e.target.value)}
                    value={todo}
                    className="w-100 ms-2"
                    placeholder="Create a new todo..."
                />
            </div>
        </div>
    )
};

export default CreateTodo;
