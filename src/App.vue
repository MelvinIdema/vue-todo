<template>
  <header>
    <h1>ToVue</h1>
  </header>
  <nav>
    <router-link to="/">Overview</router-link>
    <router-link to="/add">Add Todo</router-link>
  </nav>
  <main>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"/>
      </transition>
    </router-view>
  </main>
</template>

<script>
export default {
  name: 'App',
  computed() {
    return {
      todoItems: this.$store.getters.getTodoItems,
    }
  },
  methods: {
    toggleTodo(id) {
      this.$store.dispatch("toggleTodo", id);
    },
    removeTodo(id) {
      this.$store.commit("removeTodo", id);
    }
  },
  mounted() {
    this.$store.dispatch("fetchTodoItems");
  }
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

nav a.router-link-active {
  background: var(--primary-light);
}

.route-enter-active,
.route-leave-active {
  transition: opacity 0.2s;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}
</style>
