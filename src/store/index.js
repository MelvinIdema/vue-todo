import {createStore} from "vuex";

const localStoragePlugin = store => {
    let prevState = JSON.stringify(store.state.todoItems);

    store.subscribe((mutation, state) => {
        if (prevState === state.todoItems) return;
        const nextState = JSON.stringify(state.todoItems);
        localStorage.setItem("todoItems", nextState);
        prevState = nextState;
    });
};

export default createStore({
    state: {
        todoItems: []
    },
    getters: {
        getTodoItems(state) {
            return state.todoItems;
        }
    },
    mutations: {
        setTodoItems(state, todoItems) {
            state.todoItems = [...todoItems];
        },
        addTodoItem(state, todoItem) {
            const checkedItems = state.todoItems.filter(todo => todo.checked);
            const uncheckedItems = state.todoItems.filter(todo => !todo.checked);
            state.todoItems = [...uncheckedItems, todoItem, ...checkedItems];
        },
        toggleTodoItem(state, id) {
            const todo = state.todoItems.find(todo => todo.id === id);
            todo.checked = !todo.checked;

            if (todo.checked) {
                const todoItemsWithoutItem = state.todoItems.filter(todo => todo.id !== id);
                const checkedItems = todoItemsWithoutItem.filter(todo => todo.checked);
                const uncheckedItems = todoItemsWithoutItem.filter(todo => !todo.checked);
                state.todoItems = [...uncheckedItems, todo, ...checkedItems];
            } else {
                const todoItemsWithoutItem = state.todoItems.filter(todo => todo.id !== id);
                const checkedItems = todoItemsWithoutItem.filter(todo => todo.checked);
                const uncheckedItems = todoItemsWithoutItem.filter(todo => !todo.checked);
                state.todoItems = [...uncheckedItems, todo, ...checkedItems];
            }
        },
        removeTodoItem(state, id) {
            const index = state.todoItems.findIndex(todo => todo.id === id);
            state.todoItems.splice(index, 1);
        }
    },
    actions: {
        setTodoItems({commit}, todoItems) {
            commit("setTodoItems", todoItems);
        },
        addTodoItem({commit}, todoItem) {
            commit("addTodoItem", todoItem);
        },
        toggleTodoItem({commit}, todoItemId) {
            commit("toggleTodoItem", todoItemId);
        },
        removeTodoItem({commit}, todoItemId) {
            commit("removeTodoItem", todoItemId);
        },
        fetchTodoItems() {
            const todoItems = localStorage.getItem("todoItems");
            if (todoItems) {
                this.commit("setTodoItems", JSON.parse(todoItems));
            }
        }
    },
    plugins: [localStoragePlugin]
});