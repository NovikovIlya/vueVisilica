<script setup lang="ts">
import GameHeader from './components/GameHeader.vue'
import GameFigure from './components/GameFigure.vue'
import GameWrongLetters from './components/GameWronLetters.vue'
import GameWord from './components/GameWord.vue'
import GamePopup from './components/GamePopup.vue'
import GameNotification from './components/GameNotification.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { getRandomName } from './api/getRandomName'
import { useRandomWord } from './composables/useRandomWord'
import { useLetters } from './composables/useLetters'

const { word, getRandomWord } = useRandomWord()
const { correctLetters, wrongLetters, letters, isWin, isLose } = useLetters(word)

const notification = ref<InstanceType<typeof GameNotification> | null>(null)
const popup = ref<InstanceType<typeof GamePopup> | null>(null)

window.addEventListener('keydown', ({ key }) => {
  if (isLose.value || isWin.value) return
  if (letters.value.includes(key)) {
    console.log('сработал')
    notification.value?.open()
    console.log('notification.value', notification.value)
    setTimeout(() => notification.value?.close(), 2000)

    return
  }
  if (/[а-яА-ЯёЁ]/.test(key)) {
    console.log(key)
    letters.value.push(key.toLowerCase())
  }
})

const restart = async () => {
  await getRandomWord()
  letters.value = []
  popup.value?.close()
}

watch(wrongLetters, () => {
  if (isLose.value) {
    popup.value?.open('lose')
  }
})

watch(correctLetters, () => {
  if (isWin.value) {
    popup.value?.open('win')
  }
  if (correctLetters.value.length === word.value.length) {
    popup.value?.open('win')
  }
})

onMounted(() => {
  getRandomWord()
})
</script>

<template>
  <div id="app">
    {{ letters }}
    {{ word }}
    {{ correctLetters }}
    {{ wrongLetters }}
    <GameHeader />
    <div class="game-container">
      <GameFigure :wrongLettersCount="wrongLetters.length" />

      <GameWrongLetters :wrongLetters="wrongLetters" />
      <GameWord :word="word" :correctLetters="correctLetters" />
    </div>

    <!-- Container for final message -->
    <GamePopup ref="popup" :word="word" @restart="restart" />

    <!-- Notification -->
    <GameNotification ref="notification" />
  </div>
</template>

<style scoped></style>
