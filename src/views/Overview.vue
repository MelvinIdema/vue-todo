<template>
  <!-- I've done it this way in preparation for multiple lists -->
  <div class="lists">
    <div class="list">
      <TodoList/>
    </div>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'Overview',
  components: {
    TodoList
  }
}
</script>

<style scoped>
.lists {
  display: grid;
  grid-template-columns: 768px;
  grid-gap: 32px;
  margin: 0 32px;
  justify-content: space-around;
}
</style>