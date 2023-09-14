<template>
  <article :class="{ checked: isChecked }" @click="toggleTodo">
    <div class="controls">
      <BaseButton @click.stop="removeTodo" variant="icon">
        <font-awesome-icon icon="fa-regular fa-trash-can"/>
      </BaseButton>
    </div>
    <main>
      <h2>{{ todo.title }}</h2>
    </main>
    <footer>
      <input
          type="checkbox"
          :name="`todo-${todo.id}`"
          :id="`todo-${todo.id}`"
          :checked="isChecked"
      >
    </footer>
  </article>
</template>

<script>
import BaseButton from "@/components/UI/BaseButton.vue";

export default {
  name: "TodoItem",
  components: {
    BaseButton
  },
  props: {
    todo: {
      type: Object,
      required: true,
      default: {
        title: "Default Title",
        checked: false,
        id: "default"
      }
    }
  },
  computed: {
    isChecked() {
      return this.todo.checked;
    }
  },
  methods: {
    toggleTodo() {
      this.$store.dispatch('toggleTodoItem', this.todo.id);
    },
    removeTodo() {
      this.$store.dispatch('removeTodoItem', this.todo.id);
    }
  }
}
</script>

<style scoped>
article {
  display: flex;
  flex-direction: row;
  gap: 16px;
  background: var(--surface);
  padding: 16px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 16px;
  cursor: pointer;
}

main {
  flex-grow: 1;
  padding-right: 16px;
  width: 100%;
  display: flex;
  align-items: center;
}

.checked {
  box-shadow: none;
  opacity: 0.75;
}

.checked h2 {
  text-decoration: line-through;
  color: var(--secondary);
}

footer {
  padding: 12px;
}

/* Smooth Checkbox */
input[type="checkbox"] {
  width: 24px;
  height: 24px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: 2px solid var(--primary);
  border-radius: 4px;
  transition: 0.2s;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  background: var(--primary);
  border-color: var(--primary);
}

input[type="checkbox"]:checked::before {
  content: "✔";
  display: block;
  text-align: center;
  color: var(--surface);
  font-size: 16px;
  line-height: 24px;
}

input[type="checkbox"]:focus {
  outline: 3px var(--primary-dark);
}

input[type="checkbox"]:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>