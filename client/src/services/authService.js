import API from "./api";

export const signup = (data) => API.post('/signup', data)
export const login = (data) => API.post('/login', data)
export const googleAuth = (code) => API.get(`/google?code=${code}`)
export const getMe = () => API.get('/me')
export const logout = () => API.post('/logout')