import { Draggable } from 'react-beautiful-dnd';

import deleteImg from '../assets/images/icon-cross.svg'
import check from '../assets/images/icon-check.svg'
import { Todos } from './todoTaskDetails';

interface ITodoItemProps {
    onTodoClick: (todo: Todos, index: number) => void,
    todo: Todos,
    index: number,
    onDelete: (id: number) => void
}
/**
 * @returns Single todo row in the list 
 */
function TodoItem({ onTodoClick, todo, index, onDelete }: ITodoItemProps) {
    return (
        <Draggable draggableId={index.toString()} index={index}>
            {
                (provided, snapshot) => (
                    <li
                        className={`${snapshot.isDragging ? "drag" : ""} nav-item d-flex align-items-center position-relative`}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
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
                            className={`${todo.isCompleted ? "text-line-through" : ""} todo-text`}>{todo.todo}</p>
                        <img src={deleteImg} alt="delete" className='delete-icon position-absolute cursor-pointer'
                            onClick={() => onDelete(todo.id)}
                        />
                    </li>
                )
            }
        </Draggable>
    )
};

export default TodoItem;
