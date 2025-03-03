import axios from "axios"
import { getToken } from "../utils/auth.js"

const BASE_URL = import.meta.env.VITE_API_URL

//Signup API Service
export const signup = async (formData) => {

try {
    const res = await axios.post(BASE_URL + '/auth/register/', formData)
    return res.data
} catch (error) {
    console.log(error)
    throw error
}
}


export const signin = async (formData) => {
    try {
        const res = await axios.post(BASE_URL + '/auth/login/', formData)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateProfile = async (formData) => {
    try {
        const res = await axios.put(BASE_URL + '/auth/profile/', formData, {
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