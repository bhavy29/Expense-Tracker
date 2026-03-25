import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/user',
  withCredentials: true
})

export const deleteUser = () => API.delete('/deleteUser')
