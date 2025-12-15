import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL + '/players/'

export const playerIndex = async () => {
  try {
    const res = await axios.get(BASE_URL)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const playerShow = async (playerId, playerData) => {
  try {
    const res = await axios.get(`${BASE_URL}${playerId}/`, playerData)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
} 