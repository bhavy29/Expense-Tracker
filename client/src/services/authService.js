import API from "./api";

export const signup = (data) => API.post('/auth/signup', data)
export const login = (data) => API.post('/auth/login', data)
export const googleAuth = (code) => API.get(`/auth/google?code=${code}`)
export const getMe = () => API.get('/auth/me')
export const logout = () => API.post('/auth/logout')