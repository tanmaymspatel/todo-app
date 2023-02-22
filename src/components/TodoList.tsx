import { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { Todos } from './todoTaskDetails';
import TodoItem from './TodoItem';

interface ITodoListProps {
    todo: Todos[],
    updateTodo: (updatedTodo: Todos, index: number) => void,
    deleteTodo: (id: number) => void,
    clearTodo: () => void,
    setTodo: React.Dispatch<SetStateAction<Todos[]>>
}
/**
 * @returns todo list 
 */
function TodoList({ todo, updateTodo, deleteTodo, clearTodo, setTodo }: ITodoListProps) {
    const [completedTodo, setCompletedTodo] = useState<Todos[]>([]);
    const [activeTodo, setActiveTodo] = useState<Todos[]>([]);
    const [listType, setListType] = useState<string>("all");

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(randerTodoList(listType));
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodo(items);
    }
    /**
     * @name onTodoClick
     * @description update value of todo
     * @param todo todo with updated value
     * @param index index of todo in todo list array
     */
    const onTodoClick = (todo: Todos, index: number) => {
        updateTodo(todo, index);
    }
    /**
     * @name onDelete
     * @description delete todo on click
     * @param id id of the clicked todo
     */
    const onDelete = (id: number) => {
        deleteTodo(id)
    }
    /**
     * @name ranerTodoList
     * @description rander the todo list according to text which is clicked
     * @param text type of the todo list
     */
    const randerTodoList = useCallback((text: string) => {
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
    }, [activeTodo, completedTodo, todo])

    const todoList = useMemo(() => {
        return randerTodoList(listType)
    }, [listType, randerTodoList]);
    /**
     * @name clearTodoHandler
     * @description Clear all the completed todos
     */
    const clearTodoHandler = () => {
        clearTodo();
    }
    useEffect(() => {
        const completedTodo = todo?.filter(todo => todo.isCompleted === true);
        setCompletedTodo(completedTodo);
    }, [todo]);
    // set active todos
    useEffect(() => {
        const activeTodo = todo?.filter(todo => todo.isCompleted === false)
        setActiveTodo(activeTodo)
    }, [todo]);

    return (
        <div className="todo-list-container container">
            <div className="bg-light border shadow-sm d-flex flex-column overflow-hidden">
                <div className="todo-list flex-grow-1">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="todoList">
                            {
                                (provided, snapshot) => (
                                    <ul
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`${snapshot.isDraggingOver ? "drag-active" : ""}`}
                                    >
                                        {todoList.length !== 0 ? todoList?.map((todo: Todos, index: number) => {
                                            return (
                                                <TodoItem
                                                    key={index}
                                                    onTodoClick={onTodoClick}
                                                    todo={todo}
                                                    index={index}
                                                    onDelete={onDelete}
                                                />
                                            )
                                        })
                                            :
                                            <li className='nav-item d-flex align-items-center'>No Records Found!</li>}
                                        {provided.placeholder}
                                    </ul>
                                )
                            }

                        </Droppable>
                    </DragDropContext>
                </div>
                <div className={`${todoList.length === 0 ? "justify-content-center" : ""} d-flex padding footer position-relative`}>
                    {todoList.length !== 0 && <div className="todo-footer todo-footer-1">
                        <p className='footer-text'>
                            {activeTodo?.length} items left
                        </p>
                    </div>}
                    <div className="todo-footer todo-footer-2 d-flex">
                        <p className={`${listType === "all" ? "active" : ""} cursor-pointer footer-text text-primary`} onClick={() => setListType('all')}>All</p>
                        <p className={`${listType === "active" ? "active" : ""} cursor-pointer footer-text mx-2`} onClick={() => setListType('active')}>Active</p>
                        <p className={`${listType === "completed" ? "active" : ""} cursor-pointer footer-text`} onClick={() => setListType('completed')} >Completed</p>
                    </div>
                    {todoList.length !== 0 && <div className="todo-footer text-end todo-footer-3">
                        <p className='cursor-pointer footer-text' onClick={clearTodoHandler}>Clear Completed</p>
                    </div>}
                </div>
            </div>
        </div>
    )
};

export default TodoList;
