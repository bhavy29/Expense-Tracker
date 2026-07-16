import API from "./api";

export const addIncome = (data) => API.post('/income', data)
export const income = () => API.get('/income')
export const deleteIncome = (id) => API.delete(`/income/${id}`)
export const getMonthlyIncome = (year,month) => API.get(`/income/monthly-summary?year=${year}&month=${month}`)
export const getCategoryWiseIncome  = (year,month) => API.get(`/income/category-summary?year=${year}&month=${month}`)
export const get7daysIncome = () => API.get('/income/weekly-summary')