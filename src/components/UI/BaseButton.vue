<template>
  <button :class="{ iconBtn: variant === 'icon' }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: ['variant']
}
</script>

<style scoped>
button {
  padding: 12px;
  font-size: 24px;
  border-radius: 4px;
  background: var(--primary);
  color: var(--surface);
  transition: 0.2s;
  cursor: pointer;
  border: none;
}

button:hover {
  background: var(--primary-dark);
}

.iconBtn {
  padding: 12px 16px;
}
</style>