<template>
  <header>
    <h1>ToFoe</h1>
  </header>
  <main>
      <Overview />
  </main>
</template>

<script>
import Overview from "@/views/Overview.vue";

export default {
  name: 'App',
  components: {
    Overview
  },
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
}
</style>
