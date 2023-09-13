<template>
  <draggable
      v-if="todoItems"
      v-model="todoItemsList"
      tag="ul"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
  >
    <template #item="{element}">
      <li>
        <TodoItem :todo="element"/>
      </li>
    </template>
  </draggable>
  <p v-else>No todo items yet... Please add your first one!</p>
</template>

<script>
import draggable from "vuedraggable";
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "Overview",
  components: {
    TodoItem,
    draggable,
  },
  inject: ["todoItems", "setTodoItems", "toggleTodo"],
  data() {
    return {
      drag: false
    }
  },
  computed: {
    todoItemsList: {
      get() {
        return this.todoItems;
      },
      set(value) {
        this.setTodoItems(value);
      }
    }
  },
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

ul li {
  margin-bottom: 16px;
}
</style>