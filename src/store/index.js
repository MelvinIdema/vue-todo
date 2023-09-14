import { createStore } from 'vuex'
import { useFirestore } from 'vuefire'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const collection = import.meta.env.DEV ? "todos-dev" : "todos";

const firestorePlugin = store => {
    const db = useFirestore();
    store.subscribe(async (mutation, state) => {
        await setDoc(doc(db, collection, "todoItems"), {
            todoItems: state.todoItems
        });
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
        async fetchTodoItems() {
            const db = await useFirestore();
            const docRef = await doc(db, collection, "todoItems");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const todoItems = docSnap.data().todoItems;
                this.commit("setTodoItems", todoItems);
            }
        }
    },
    plugins: [firestorePlugin]
});