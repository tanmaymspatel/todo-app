import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

function Todo() {
    return (
        <div className=" content-width">
            <CreateTodo />
            <TodoList />
        </div>
    )
};

export default Todo;
