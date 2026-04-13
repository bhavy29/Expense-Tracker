import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true
})

export const addExpense = (data) => API.post('/expenses', data)
export const deleteExpense = (id) => API.delete(`/expenses/${id}`)
export const getMonthlyExpense = (year,month) => API.get(`/expenses/monthly-summary?year=${year}&month=${month}`)
export const getCategoryWiseExpense  = (year,month) => API.get(`/expenses/category-summary?year=${year}&month=${month}`)
export const get7daysExpense = () => API.get('/expenses/weekly-summary')