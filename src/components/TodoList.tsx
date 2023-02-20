import { useEffect, useState } from 'react';

import deleteImg from '../assets/images/icon-cross.svg'
import check from '../assets/images/icon-check.svg'
import { Todos } from './todoTaskDetails';

interface ITodoListProps {
    todo: Todos[],
    updateTodo: (updatedTodo: Todos, index: number) => void,
    deleteTodo: (id: number) => void,
    clearTodo: () => void
}

function TodoList({ todo, updateTodo, deleteTodo, clearTodo }: ITodoListProps) {
    // const [todos, setTodos] = useState<any[]>([]);
    const [completedTodo, setCompletedTodo] = useState<any[]>([]);
    const [activeTodo, setActiveTodo] = useState<any[]>([]);
    const [listType, setListType] = useState<string>("all");

    const onTodoClick = (todo: Todos, index: number) => {
        updateTodo(todo, index);
    }

    const onDelete = (id: number) => {
        deleteTodo(id)
    }

    const ranerTodoList = (text: string) => {
        switch (text) {
            case "all":
                return todo;
            case "active":
                return activeTodo;
            case "completed":
                return completedTodo;
            default:
                return todo;
        }
    }

    const todoData = todo && todo.length > 0 && ranerTodoList(listType)?.map((todo: Todos, index: number) => {
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
        clearTodo();
    }

    useEffect(() => {
        const completedTodo = todo?.filter(todo => todo.isCompleted === true);
        setCompletedTodo(completedTodo);
    }, [todo])
    useEffect(() => {
        const activeTodo = todo?.filter(todo => todo.isCompleted === false)
        setActiveTodo(activeTodo)
    }, [todo]);

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
                        {todo && <p className='footer-text'>
                            {activeTodo?.length} items left
                        </p>}
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
