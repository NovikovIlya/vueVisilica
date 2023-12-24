<script setup lang="ts">
import GameHeader from './components/GameHeader.vue';
import GameFigure from './components/GameFigure.vue';
import GameWrongLetters from './components/GameWronLetters.vue';
import GameWord from './components/GameWord.vue';
import GamePopup from './components/GamePopup.vue';
import GameNotification from './components/GameNotification.vue';
import { computed, ref } from 'vue';

const word = ref('вася')
const letters = ref<string[]>([])
const notification = ref<InstanceType<typeof GameNotification> | null>(null)
const correctLetters = computed(()=>{
  return letters.value.filter(letter => word.value.includes(letter))
})
const wrongLetters = computed(()=>{
  return letters.value.filter(letter => !word.value.includes(letter))
})

window.addEventListener('keydown', ({key}) => {
  if(letters.value.includes(key)){
    console.log('сработал')
    notification.value?.open()
    console.log('notification.value',notification.value)
    setTimeout(()=>notification.value?.close(), 2000)

    return
  }
  if(/[а-яА-ЯёЁ]/.test(key)){
    console.log(key)
    letters.value.push(key.toLowerCase())
  }
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
      <GameWord :word="word" :correctLetters="correctLetters"/>
    </div> 

    <!-- Container for final message -->
    <GamePopup />

    <!-- Notification -->
    <GameNotification ref="notification"/>
  </div>
</template>

<style scoped>

</style>
