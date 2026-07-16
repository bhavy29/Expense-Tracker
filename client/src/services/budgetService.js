import API from "./api";

// MONTHLY BUDGET

export const getMonthlyBudget = async (month, year) => {
  const response = await API.get(
    `/budget/monthly/${month}/${year}`
  );

  return response.data;
};

// CATEGORY BUDGETS

export const getCategoryBudgets = async (month, year) => {
  const response = await API.get(
    `/budget/category/${month}/${year}`
  );

  return response.data;
};

// WEEKLY BUDGET

export const getWeeklyBudget = async () => {
  const response = await API.get(
    '/budget/weekly'
  );

  return response.data;
};

// SET MONTHLY BUDGET

export const setMonthlyBudget = async (data) => {
  const response = await API.post(
    '/budget/monthly',
    data
  );

  return response.data;
};

// SET CATEGORY BUDGET

export const setCategoryBudget = async (data) => {
  const response = await API.post(
    '/budget/category',
    data
  );

  return response.data;
};

// SET WEEKLY BUDGET

export const setWeeklyBudget = async (data) => {
  const response = await API.post(
    '/budget/weekly',
    data
  );

  return response.data;
};