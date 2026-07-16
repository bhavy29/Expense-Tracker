import API from "./api";

export const allExp = () => API.get('/expenses')
export const addExpense = (data) => API.post('/expenses', data)
export const deleteExpense = (id) => API.delete(`/expenses/${id}`)
export const getMonthlyExpense = (year,month) => API.get(`/budget/monthly-summary?year=${year}&month=${month}`)
export const getCategoryWiseExpense  = (year,month) => API.get(`/budget/category-summary?year=${year}&month=${month}`)
export const get7daysExpense = () => API.get('/weekly-summary')