import { useEffect, useState } from "react";

import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";
import { Todos } from "./todoTaskDetails";

function Todo() {
    const allTodos = JSON.parse(localStorage.getItem("todoList") as string)
    const [todo, setTodo] = useState<Todos[]>(allTodos);

    const addTodo = (value: Todos) => {
        setTodo((prev: Todos[]) => {
            if (prev === null) return [value]
            else return [...prev, value]
        })
        localStorage.setItem("todoList", JSON.stringify(todo));
    }

    const updateTodo = (updatedTodo: Todos, index: number) => {
        todo[index].isCompleted === true ? todo[index].isCompleted = false : todo[index].isCompleted = true;
        todo?.splice(index, 1, updatedTodo);
        localStorage.setItem("todoList", JSON.stringify(todo))
        setTodo(JSON.parse(localStorage.getItem("todoList") as string));
    }

    const deleteTodo = (id: number) => {
        const newList = todo?.filter((todo: Todos) => todo.id !== id);
        localStorage.setItem("todoList", JSON.stringify(newList));
        setTodo(newList);
    }

    const clearTodo = () => {
        const clearCompltedTodo = todo.filter(todo => todo.isCompleted === false);
        localStorage.setItem("todoList", JSON.stringify(clearCompltedTodo));
        setTodo(clearCompltedTodo);
    }

    useEffect(() => {
        todo && localStorage.setItem("todoList", JSON.stringify(todo));
    }, [todo])

    return (
        <div className="content-width">
            <CreateTodo addTodo={addTodo}
                allTodos={allTodos} />
            <TodoList
                todo={todo}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
                clearTodo={clearTodo}
            />
        </div>
    )
};

export default Todo;
