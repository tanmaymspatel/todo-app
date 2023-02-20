import { useEffect, useState } from 'react';

import deleteImg from '../assets/images/icon-cross.svg'
import check from '../assets/images/icon-check.svg'
import { Todo } from './todoTaskDetails';

function TodoList() {
    const [todos, setTodos] = useState<any[]>([]);
    const [completedTodo, setCompletedTodo] = useState<any[]>([]);
    const [activeTodo, setActiveTodo] = useState<any[]>([]);
    const [listType, setListType] = useState<string>("all");

    const onTodoClick = (todo: Todo, index: number) => {
        todo.isCompleted === true ? todo.isCompleted = false : todo.isCompleted = true;
        todos?.splice(index, 1, todo);
        localStorage.setItem("todoList", JSON.stringify(todos))
        setTodos(todos);
    }

    const onDelete = (id: number) => {
        const newList = todos?.filter((todo: Todo) => todo.id !== id);
        localStorage.setItem("todoList", JSON.stringify(newList));
        setTodos(newList);
    }

    const ranerTodoList = (text: string) => {
        switch (text) {
            case "all":
                return todos;
            case "active":
                return activeTodo;
            case "completed":
                return completedTodo;
            default:
                return todos;
        }
    }

    const todoData = ranerTodoList(listType)?.map((todo: Todo, index: number) => {
        return (
            <li className="nav-item d-flex align-items-center position-relative"
                key={index}
            >
                <label
                    onClick={() => onTodoClick(todo, index)}
                    htmlFor="todo" className="round-check cursor-pointer">
                    {todo.isCompleted && <figure className='check-container d-flex align-items-center justify-content-center'>
                        <img src={check} alt="check-mark" className='icon-check' />
                    </figure>}
                </label>
                <p

                    className={`${todo.isCompleted ? "text-line-through" : ""} todo-margin cursor-pointer`}>{todo.todo}</p>
                <img src={deleteImg} alt="delete" className='delete-icon position-absolute cursor-pointer'
                    onClick={() => onDelete(todo.id)}
                />
            </li>
        )
    })

    const clearTodoHandler = () => {
        const clearCompltedTodo = todos.filter(todo => todo.isCompleted === false);
        localStorage.setItem("todoList", JSON.stringify(clearCompltedTodo));
        setTodos(clearCompltedTodo);
    }

    useEffect(() => {
        const jsonString = localStorage.getItem("todoList") as string;
        setTodos(JSON.parse(jsonString))
    }, []);

    useEffect(() => {
        const completedTodo = todos.filter(todo => todo.isCompleted === true);
        setCompletedTodo(completedTodo);
    }, [todos])
    useEffect(() => {
        const activeTodo = todos.filter(todo => todo.isCompleted === false)
        setActiveTodo(activeTodo)
    }, [todos]);

    return (
        <div className="todo-list-container container">
            <div className="bg-light border shadow-sm d-flex flex-column">
                <div className="flex-grow-1">
                    <ul>
                        {todoData}
                    </ul>
                </div>
                <div className="d-flex padding footer">
                    <div className="todo-footer todo-footer-1">
                        <p className='footer-text'>
                            {activeTodo.length} items left
                        </p>
                    </div>
                    <div className="todo-footer todo-footer-2 d-flex">
                        <p className='cursor-pointer footer-text text-primary' onClick={() => setListType('all')}>All</p>
                        <p className="cursor-pointer footer-text mx-2" onClick={() => setListType('active')}>Active</p>
                        <p className='cursor-pointer footer-text' onClick={() => setListType('completed')} >Completed</p>
                    </div>
                    <div className="todo-footer text-center todo-footer-3">
                        <p className='cursor-pointer footer-text' onClick={clearTodoHandler}>Clear Completed</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TodoList;
