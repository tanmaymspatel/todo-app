import deleteImg from '../assets/images/icon-cross.svg'
import check from '../assets/images/icon-check.svg'
import { Todos } from './todoTaskDetails';

interface ITodoItemProps {
    onTodoClick: (todo: Todos, index: number) => void,
    todo: Todos,
    index: number,
    onDelete: (id: number) => void
}

function TodoItem({ onTodoClick, todo, index, onDelete }: ITodoItemProps) {
    return (
        <li className="nav-item d-flex align-items-center position-relative"
        >
            <label
                onClick={() => onTodoClick(todo, index)}
                htmlFor="todo" className="round-check cursor-pointer">
                {todo.isCompleted && <figure className='check-container d-flex align-items-center justify-content-center'>
                    <img src={check} alt="check-mark" className='icon-check' />
                </figure>}
            </label>
            <p
                className={`${todo.isCompleted ? "text-line-through" : ""} todo-text cursor-pointer`}>{todo.todo}</p>
            <img src={deleteImg} alt="delete" className='delete-icon position-absolute cursor-pointer'
                onClick={() => onDelete(todo.id)}
            />
        </li>
    )
};

export default TodoItem;
