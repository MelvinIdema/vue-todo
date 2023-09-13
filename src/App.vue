<template>
  <header>
    <h1>ToVue</h1>
  </header>
  <nav>
    <router-link to="/">Overview</router-link>
    <router-link to="/add">Add Todo</router-link>
  </nav>
  <main>
    <router-view/>
  </main>
</template>

<script>
import {computed} from "vue";

export default {
  name: 'App',
  data() {
    return {
      todoItems: null,
    }
  },
  methods: {
    createTodo(todo) {
      this.todoItems.push(todo);
    },
    toggleTodo(id) {
      const todo = this.todoItems.find(todo => todo.id === id);
      todo.checked = !todo.checked;

      if (todo.checked) {
        const todoItemsWithoutItem = this.todoItems.filter(todo => todo.id !== id);
        this.todoItems = [...todoItemsWithoutItem, todo];
      } else {
        const todoItemsWithoutItem = this.todoItems.filter(todo => todo.id !== id);
        this.todoItems = [todo, ...todoItemsWithoutItem];
      }

    },
    removeTodo(id) {
      console.log("removeTodo", id);
      const index = this.todoItems.findIndex(todo => todo.id === id);
      this.todoItems.splice(index, 1);
    },
    setTodoItems(todoItems) {
      this.todoItems = todoItems;
    }
  },
  mounted() {
    const todoItems = localStorage.getItem("todoItems");
    if (todoItems) {
      this.todoItems = JSON.parse(todoItems);
    }
  },
  watch: {
    todoItems: {
      handler(todoItems) {
        localStorage.setItem("todoItems", JSON.stringify(todoItems));
      },
      deep: true
    }
  },
  provide() {
    return {
      todoItems: computed(() => this.todoItems),
      createTodo: this.createTodo,
      toggleTodo: this.toggleTodo,
      removeTodo: this.removeTodo,
      setTodoItems: this.setTodoItems,
    }
  },
}
</script>

<style scoped>
header {
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 24px;
  margin-bottom: 16px;
}

main {
  max-width: 768px;
  margin: 0 auto;
  height: 100%;
  width: 100%;
}

nav {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}

nav a {
  display: block;
  padding: 8px 16px;
  border-radius: 8px;
  background: var(--primary);
  color: var(--surface);
  text-decoration: none;
  transition: 0.2s;
}

nav a:hover {
  background: var(--primary-light);
}
</style>
