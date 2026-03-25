import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/auth',
  withCredentials: true
})

export const signup = (data) => API.post('/signup', data)
export const login = (data) => API.post('/login', data)
export const googleAuth = (code) => API.get(`/google?code=${code}`)
export const getMe = () => API.get('/me')
export const exp = () => API.get('/exp')
export const logout = () => API.post('/logout')