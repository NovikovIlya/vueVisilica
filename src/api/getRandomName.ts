import axios from 'axios'

export const getRandomName = async () => {

    const { data } = await axios.get(
      'https://api.randomdatatools.ru/?unescaped=false&params=FirstName'
    )
    return data
  
}
