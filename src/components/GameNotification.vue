<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(false)

const open = () => {
  isVisible.value = true
}
const close = () => {
  isVisible.value = false
}

defineExpose({
  open,
  close
})
console.log(isVisible)
</script>

<template>
  <div :class="{ show: isVisible }" class="notification-container">
    <p>Вы уже вводили этот символ</p>
  </div>
</template>

<style scoped></style>
