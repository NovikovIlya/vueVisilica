import { computed, ref, type Ref } from 'vue'

export const useLetters = (word: Ref<string>) => {
  const letters = ref<string[]>([])
  const correctLetters = computed(() => {
    return letters.value.filter((letter) => word.value.includes(letter))
  })
  const wrongLetters = computed(() => {
    return letters.value.filter((letter) => !word.value.includes(letter))
  })
  const isLose = computed(() => {
    return wrongLetters.value.length === 6
  })
  const isWin = computed(() => {
    return word.value.split('').every((x) => correctLetters.value.includes(x))
  })
  return {
    letters,
    correctLetters,
    wrongLetters,
    isLose,
    isWin
  }
}
