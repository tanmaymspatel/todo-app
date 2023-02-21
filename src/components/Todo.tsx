import { useEffect, useState } from "react";

import CreateTodo from "./CreateTodo";
import DragDropText from "./DragDropText";
import TodoList from "./TodoList";
import { Todos } from "./todoTaskDetails";
/**
 * @returns while todo component
 */
function Todo() {
    const allTodos = JSON.parse(localStorage.getItem("todoList") as string);
    const [todo, setTodo] = useState<Todos[]>(allTodos);
    /**
     * @name addTodo
     * @description to add new todo to the list
     * @param value newly entered todo
     */
    const addTodo = (value: Todos) => {
        setTodo((prev: Todos[]) => {
            if (prev === null) return [value]
            else return [...prev, value]
        })
        localStorage.setItem("todoList", JSON.stringify(todo));
    }
    /**
     * @name updateTodo
     * @description updated value of checkbox
     * @param updatedTodo updated todo
     * @param index index of updated todo in todo list
     */
    const updateTodo = (updatedTodo: Todos, index: number) => {
        todo[index].isCompleted === true ? todo[index].isCompleted = false : todo[index].isCompleted = true;
        todo?.splice(index, 1, updatedTodo);
        localStorage.setItem("todoList", JSON.stringify(todo))
        setTodo(JSON.parse(localStorage.getItem("todoList") as string));
    }
    /**
     * @name deleteTodo
     * @description To delet the clicked todo
     * @param id id of the clicked todo
     */
    const deleteTodo = (id: number) => {
        const newList = todo?.filter((todo: Todos) => todo.id !== id);
        localStorage.setItem("todoList", JSON.stringify(newList));
        setTodo(newList);
    }
    /**
     * @name clearTodo
     * @description to clear all the completed todos
     */
    const clearTodo = () => {
        const clearCompltedTodo = todo.filter(todo => todo.isCompleted === false);
        localStorage.setItem("todoList", JSON.stringify(clearCompltedTodo));
        setTodo(clearCompltedTodo);
    }
    /**
     * To set the new todo value
     */
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
                setTodo={setTodo}
            />
            <DragDropText />
        </div>
    )
};

export default Todo;
