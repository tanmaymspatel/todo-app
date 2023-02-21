import { useState } from "react";
import utilityServices from "../shared/services/utilityServices";

function CreateTodo({ addTodo, allTodos }: any) {

    const [todoValue, setTodoValue] = useState("");

    const { getMaxId } = utilityServices

    const onEnterClick = (e: any) => {
        if (e.key === "Enter") {
            addTodo({
                id: !allTodos?.length ? 1 : getMaxId(allTodos) + 1,
                todo: todoValue,
                isCompleted: false
            });
            setTodoValue("");
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
                    onChange={(e) => setTodoValue(e.target.value)}
                    value={todoValue}
                    className="w-100 ms-2"
                    placeholder="Create a new todo..."
                />
            </div>
        </div>
    )
};

export default CreateTodo;
