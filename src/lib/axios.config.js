import axios from 'axios'

export const axiosInstance=axios.create({
    baseURL:'https://lead-management-system-ayqo.onrender.com',
    withCredentials:true
})