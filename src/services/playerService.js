import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL + '/players'

export const playerIndex = async () => {
  try {
    const res = await axios.get(BASE_URL)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}