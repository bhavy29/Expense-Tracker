import API from "./api";

export const allExp = () => API.get('/')
export const addExpense = (data) => API.post('/', data)
export const deleteExpense = (id) => API.delete(`/${id}`)
export const getMonthlyExpense = (year,month) => API.get(`/monthly-summary?year=${year}&month=${month}`)
export const getCategoryWiseExpense  = (year,month) => API.get(`/category-summary?year=${year}&month=${month}`)
export const get7daysExpense = () => API.get('/weekly-summary')