<script setup lang="ts">
import { ref } from 'vue'

type Status = 'win' | 'lose'

const gameStatus = ref<Status | null>(null)

const isVisible = ref(false)

const open = (status: Status) => {
  gameStatus.value = status
  isVisible.value = true
}
const close = () => {
  isVisible.value = false
}

defineExpose({
  open,
  close
})
</script>

<template>
  <div v-if="isVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gameStatus === 'win'">Поздравляю, вы победили! 😃</h2>

      <template v-else>
        <h2>Вы проиграли. 😕</h2>
        <h3>...имя: Лидия</h3>
      </template>

      <button>Сыграть еще раз</button>
    </div>
  </div>
</template>

<style scoped></style>
