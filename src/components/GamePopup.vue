<script setup lang="ts">
import { ref } from 'vue'
import type { GameStatus} from '../types/GameStatusType'

export type PopupProps={
  word:string;
}

const props = defineProps<PopupProps>()

const emit = defineEmits<{
  (e:'restart'):void;
}>()

const gameStatus = ref<GameStatus | null>(null)

const isVisible = ref(false)

const open = (status: GameStatus) => {
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

      <button @click="emit('restart')">Сыграть еще раз</button>
    </div>
  </div>
</template>

<style scoped></style>
