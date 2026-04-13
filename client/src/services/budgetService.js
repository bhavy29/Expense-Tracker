import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

export const setMonthlyBudget = (data) => API.post("/budget/setMonthlyBudget", data);
export const getMonthlyBudget = (year, month) => API.get(`/budget/getMonthlyBudget/${year}/${month}`);