import { Todos } from "../../components/todoTaskDetails";

const setLocalStorage = (data: Todos[]) => {
    localStorage.setItem("todoList", JSON.stringify(data));
};

/**
 * @name getMaxId
 * @param List todo list from which item of maximum id is to be found
 * @returns a maximum number
 */
const getMaxId = (List: Todos[]) => {
    return Math.max(...List.map((todo: Todos) => todo.id));
}

const utilityServices = {
    setLocalStorage,
    getMaxId
};

export default utilityServices;