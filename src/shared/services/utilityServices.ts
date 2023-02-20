import { Todo } from "../../components/todoTaskDetails";

const setLocalStorage = (data: Todo[]) => {
    localStorage.setItem("todoList", JSON.stringify(data));
};

/**
 * @name getMaxId
 * @param List task list from which item of maximum id is to be found
 * @returns a maximum number
 */
const getMaxId = (List: Todo[]) => {
    return Math.max(...List.map((task: Todo) => task.id));
}

const utilityServices = {
    setLocalStorage,
    getMaxId
};

export default utilityServices;