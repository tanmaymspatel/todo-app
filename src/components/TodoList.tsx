import deleteImg from '../assets/images/icon-cross.svg'
import check from '../assets/images/icon-check.svg'
import { useCallback, useEffect, useState } from 'react';
import { todoList } from './todoTaskDEtails';


function TodoList() {
    // const [checked, setChecked] = useState<boolean>(false);
    const [todos, setTodos] = useState<any[]>();

    const onTodoClick = (todo: any, index: number) => {
        todo.isCompleted === true ? todo.isCompleted = false : todo.isCompleted = true;
        todoList?.splice(index, 1, todo);
        localStorage.setItem("todoList", JSON.stringify(todoList))
    }

    const onDelete = (id: number) => {
        todoList?.filter((todo: any) => todo.id !== id);
    }

    const todoData = todos?.map((todo: any, index: number) => {
        return (
            <li className="nav-item d-flex align-items-center position-relative"
                key={index}
                onClick={() => onTodoClick(todo, index)}>
                <label htmlFor="todo" className="round-check cursor-pointer">
                    {todo.isCompleted && <figure className='check-container d-flex align-items-center justify-content-center'>
                        <img src={check} alt="check-mark" className='icon-check' />
                    </figure>}
                </label>
                <p className={`${todo.isCompleted ? "text-line-through" : ""} todo-margin cursor-pointer`}>{todo.todo}</p>
                <img src={deleteImg} alt="delete" className='delete-icon position-absolute cursor-pointer'
                    onClick={() => onDelete(todo.id)}
                />
            </li>
        )
    })

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList) as string)
    }, [])

    let list: any[];
    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem("todoList") as string))
    }, [])

    return (
        <div className="todo-list-container container">
            <div className="bg-light border shadow-sm d-flex flex-column">
                <div className="flex-grow-1">
                    <ul>
                        {todoData}
                    </ul>
                </div>
                <div className="d-flex padding">
                    <div className="todo-footer">
                        <p>
                            5 items left
                        </p>
                    </div>
                    <div className="todo-footer d-flex">
                        <p className='cursor-pointer text-primary'>All</p>
                        <p className="cursor-pointer mx-2">Active</p>
                        <p className='cursor-pointer '>Completed</p>
                    </div>
                    <div className="todo-footer text-center">
                        <p className='cursor-pointer '>Clear Completed</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TodoList;
