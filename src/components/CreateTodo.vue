<template>
  <section>
    <form @submit.prevent="saveTodo" class="add-form">
        <BaseInput type="text" id="title" ref="titleInput" />
        <BaseButton type="submit" variant="icon">
          <font-awesome-icon icon="fa-regular fa-plus-square"/>
        </BaseButton>
    </form>
  </section>
</template>

<script>
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseInput from "@/components/UI/BaseInput.vue";

export default {
  name: "CreateTodo",
  components: {
    BaseButton,
    BaseInput
  },
  methods: {
    saveTodo() {
      const title = this.$refs.titleInput.$el.value
      this.$store.dispatch('addTodoItem', {
        title,
        checked: false,
        id: Math.random().toString(),
      });
    },
  },
}
</script>

<style scoped>
section {
  margin: 24px 0;
}

form {
  width: 100%;
}

.add-form {
  display: flex;
}

.add-form input {
  flex: 1;
  margin-right: 16px;
}
</style>