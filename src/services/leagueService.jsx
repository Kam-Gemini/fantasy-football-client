import axios from "axios"
import { getToken } from "../utils/auth.js"

const BASE_URL = import.meta.env.VITE_API_URL + '/leagues/'

export const leagueIndex = async () => {
    try {
      const res = await axios.get(BASE_URL)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

export const leaguePost = async () => {
    try {
        const res = await axios.post(BASE_URL, {
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

export const leagueUpdate = async (leagueId, leagueData) => {
    try {
        const res = await axios.put(`${BASE_URL}${leagueId}/`, leagueData, {
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

export const leagueShow = async (leagueId, leagueData) => {
    try {
        const res = await axios.get(`${BASE_URL}${leagueId}/`, leagueData, {
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

export const leagueDelete = async (leagueId) => {
    try {
        const res = await axios.delete(`${BASE_URL}${leagueId}/`, {
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