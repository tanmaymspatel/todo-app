import { useState } from "react";

function CreateTodo() {
    const [todo, setTodo] = useState<string>("")
    return (
        <div className="container todo-container">
            <div className="bg-light d-flex align-items-center form-control border">
                <label htmlFor="todo" className="round-check"></label>
                <input
                    type="text"
                    name="todo"
                    id="todo"
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
