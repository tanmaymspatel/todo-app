import deleteImg from '../assets/images/icon-cross.svg'
import check from '../assets/images/icon-check.svg'
import { useEffect, useState } from 'react';


function TodoList() {
    const [checked, setChecked] = useState<boolean>(false);
    const [todoList, setTodoList] = useState<any[]>();

    const todoData = todoList?.map((todo, index) => {
        return (
            <li className="nav-item d-flex align-items-center position-relative"
                key={index}
                onClick={() => setChecked(prev => !prev)}>
                <label htmlFor="todo" className="round-check cursor-pointer">
                    {checked && <figure className='check-container d-flex align-items-center justify-content-center'>
                        <img src={check} alt="check-mark" className='icon-check' />
                    </figure>}
                </label>
                <p className={`${checked ? "text-line-through" : ""} todo-margin cursor-pointer`}>{todo.todo}</p>
                <img src={deleteImg} alt="delete" className='delete-icon position-absolute cursor-pointer' />
            </li>
        )
    })

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("todoList") as string);
        setTodoList(data);
    }, []);

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
