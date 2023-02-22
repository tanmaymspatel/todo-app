import { useState } from "react";
/**
 * @returns new todo input element 
 */
function CreateTodo({ addTodo }: any) {

    const [todoValue, setTodoValue] = useState("");
    const [error, setError] = useState<boolean>(false);
    /**
     * @name onEnterClick
     * @description get value od todo after enter is pressed
     */
    const onEnterClick = (e: any) => {
        if (e.key === "Enter") {
            if (todoValue !== "") {
                addTodo({
                    id: Math.random(),
                    todo: todoValue,
                    isCompleted: false
                });
                setTodoValue("");
            }
            else setError(true);
        }

    }

    return (
        <div className="container todo-container">
            <div className="input-container d-flex align-items-center padding border shadow-sm position-relative">
                <label htmlFor="todo" className="round-check"></label>
                <input
                    type="text"
                    name="todo"
                    id="todo"
                    onKeyDown={(e) => onEnterClick(e)}
                    onChange={(e) => { setTodoValue(e.target.value); setError(false) }}
                    value={todoValue}
                    className="w-100 ms-2"
                    placeholder="Create a new todo..."
                    autoComplete="off"
                />
                {error && <small className="error-text position-absolute">Please Enter a unique value!</small>}
            </div>
        </div>
    )
};

export default CreateTodo;
