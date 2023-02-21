import { SetStateAction, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Todos } from './todoTaskDetails';
import TodoItem from './TodoItem';
import useDragDrop from '../hooks/useDragDrop';

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
    const [completedTodo, setCompletedTodo] = useState<any[]>([]);
    const [activeTodo, setActiveTodo] = useState<any[]>([]);
    const [listType, setListType] = useState<string>("all");
    // use of custom drag and drop hook
    const [, , handleDragStart, handleDragEnter, handleDragEnd, newList] = useDragDrop<Todos>(todo)
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
    /**
     * looping the list
     */
    // const todoData = todo && todo.length > 0 && ranerTodoList(listType)?.map((todo: Todos, index: number) => {
    //     return (
    //         <li
    //             className="nav-item d-flex align-items-center position-relative"
    //             key={index}
    //         >
    //             <TodoItem
    //                 key={index}
    //                 onTodoClick={onTodoClick}
    //                 todo={todo}
    //                 index={index}
    //                 onDelete={onDelete}
    //             />
    //         </li>
    //     )
    // })
    /**
     * @name clearTodoHandler
     * @description Clear all the completed todos
     */
    const clearTodoHandler = () => {
        clearTodo();
    }

    //drag drop
    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(ranerTodoList(listType));
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodo(items);
    }


    // set todos after drag and drop action
    useEffect(() => {
        newList && setTodo(newList)
    }, [newList, setTodo])
    // set complted todos
    useEffect(() => {
        const completedTodo = todo?.filter(todo => todo.isCompleted === true);
        setCompletedTodo(completedTodo);
    }, [todo])
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
                        <Droppable droppableId="todo-list">
                            {(provided: any) => (
                                <ul className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
                                    {provided.placeholder}
                                    {todo && todo.length > 0 && ranerTodoList(listType)?.map((todo: Todos, index: number) => {
                                        return (
                                            <Draggable key={index} draggableId={todo.todo} index={index}>
                                                {(provided: any) => (
                                                    <li
                                                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                        className="nav-item d-flex align-items-center position-relative"
                                                        key={index}
                                                    >
                                                        <TodoItem
                                                            key={index}
                                                            onTodoClick={onTodoClick}
                                                            todo={todo}
                                                            index={index}
                                                            onDelete={onDelete}
                                                        />
                                                    </li>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
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
