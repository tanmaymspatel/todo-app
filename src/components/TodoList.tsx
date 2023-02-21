import { useEffect, useState } from 'react';

import { Todos } from './todoTaskDetails';
import TodoItem from './TodoItem';

interface ITodoListProps {
    todo: Todos[],
    updateTodo: (updatedTodo: Todos, index: number) => void,
    deleteTodo: (id: number) => void,
    clearTodo: () => void
}

function TodoList({ todo, updateTodo, deleteTodo, clearTodo }: ITodoListProps) {
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
            <TodoItem
                onTodoClick={onTodoClick}
                todo={todo}
                index={index}
                onDelete={onDelete}
            />
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
            <div className="bg-light border shadow-sm d-flex flex-column overflow-hidden">
                <div className="todo-list flex-grow-1">
                    <ul>
                        {todoData}
                    </ul>
                </div>
                <div className="d-flex padding footer position-relative">
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
                    <div className="todo-footer text-end todo-footer-3">
                        <p className='cursor-pointer footer-text' onClick={clearTodoHandler}>Clear Completed</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TodoList;
