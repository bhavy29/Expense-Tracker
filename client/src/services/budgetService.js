import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

// MONTHLY BUDGET

export const getMonthlyBudget = async (month, year) => {

  const response = await axios.get(
    `${API}/monthly/${month}/${year}`
  );

  return response.data;
};


// CATEGORY BUDGETS

export const getCategoryBudgets = async (month, year) => {

  const response = await axios.get(
    `${API}/category/${month}/${year}`
  );

  return response.data;
};


// WEEKLY BUDGET

export const getWeeklyBudget = async () => {

  const response = await axios.get(
    `${API}/weekly`
  );

  return response.data;
};

// SET MONTHLY BUDGET

export const setMonthlyBudget = async (data) => {

  const response = await axios.post(
    `${API}/monthly`,
    data
  );

  return response.data;
};


// SET CATEGORY BUDGET

export const setCategoryBudget = async (data) => {

  const response = await axios.post(
    `${API}/category`,
    data
  );

  return response.data;
};


// SET WEEKLY BUDGET

export const setWeeklyBudget = async (data) => {

  const response = await axios.post(
    `${API}/weekly`,
    data
  );

  return response.data;
};