import { Todos } from "../../components/todoTaskDetails";

const setLocalStorage = (data: Todos[]) => {
    localStorage.setItem("todoList", JSON.stringify(data));
};

/**
 * @name getMaxId
 * @param List task list from which item of maximum id is to be found
 * @returns a maximum number
 */
const getMaxId = (List: Todos[]) => {
    return Math.max(...List.map((task: Todos) => task.id));
}

const utilityServices = {
    setLocalStorage,
    getMaxId
};

export default utilityServices;