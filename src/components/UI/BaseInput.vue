<template>
  <input type="text" v-bind="$props" />
</template>

<script>
export default {
  name: "BaseInput"
}
</script>

<style scoped>
input {
  width: 100%;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  background: var(--surface);
  color: var(--black);
}

input:focus {
  outline: none;
}
</style>