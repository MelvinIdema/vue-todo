<template>
  <section>
    <h2>Add Todo</h2>
    <form @submit.prevent="saveTodo">
      <div class="form-control">
        <label for="title" >Title</label>
        <input type="text" id="title" ref="titleInput"/>
      </div>
      <div class="form-control">
        <BaseButton type="submit">Add Todo</BaseButton>
      </div>
    </form>
  </section>
</template>

<script>
import BaseButton from "@/components/UI/BaseButton.vue";
export default {
  name: "CreateTodo",
  components: {
    BaseButton,
  },
  inject: ["createTodo"],
  methods: {
    saveTodo() {
      const title = this.$refs.titleInput.value;
      this.createTodo({
        title,
        checked: false,
        id: Math.random().toString(),
      });
      this.$router.push("/");
    },
  },
}
</script>

<style scoped>
section {
  background: var(--surface);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.form-control input,
.form-control textarea {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--primary);
  background: var(--surface);
  color: var(--black);
}
</style>