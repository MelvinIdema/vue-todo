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
            state.todoItems.push(todoItem);
        },
        toggleTodoItem(state, id) {
            const todo = state.todoItems.find(todo => todo.id === id);
            todo.checked = !todo.checked;

            if (todo.checked) {
                const todoItemsWithoutItem = state.todoItems.filter(todo => todo.id !== id);
                state.todoItems = [...todoItemsWithoutItem, todo];
            } else {
                const todoItemsWithoutItem = state.todoItems.filter(todo => todo.id !== id);
                state.todoItems = [todo, ...todoItemsWithoutItem];
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