import axios from "axios"
import { getToken } from "../utils/auth.js"

const BASE_URL = import.meta.env.VITE_API_URL + '/teams/'

export const teamIndex = async () => {
    try {
      const res = await axios.get(BASE_URL)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

export const teamPost = async (teamData) => {
    try {
        const res = await axios.post(BASE_URL, teamData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const teamUpdate = async (teamId, teamData) => {
    try {
        const res = await axios.put(`${BASE_URL}${teamId}/`, teamData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const teamShow = async (teamId, teamData) => {
    try {
        const res = await axios.get(`${BASE_URL}${teamId}/`, teamData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        console.log('team show:', res.data)
        return res.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const teamDelete = async (teamId) => {
    try {
        const res = await axios.delete(`${BASE_URL}${teamId}/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}