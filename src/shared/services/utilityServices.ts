const setLocalStorage = (data: any) => {
    localStorage.setItem("todoList", JSON.stringify(data));
};

const utilityServices = {
    setLocalStorage
};

export default utilityServices;