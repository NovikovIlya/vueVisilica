import { getRandomName } from '@/api/getRandomName'
import { onMounted, ref } from 'vue'

export const useRandomWord = () => {
  const word = ref('')
  const getRandomWord = async () => {
    try {
      const data = await getRandomName()
      word.value = data.FirstName.toLowerCase()
    } catch (error) {
      console.log(error)
      word.value = ''
    }
  }
  onMounted(()=>{
    getRandomWord()
  })
  
  return{
    word,
    getRandomWord
  }
}
