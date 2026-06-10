import React, { useEffect, useState } from "react";

import {
  getMonthlyBudget,
//   getCategoryBudgets,
  getWeeklyBudget,
} from "../services/budgetService";

import BudgetCard from "../components/budget/BudgetCard";

import CategoryBudgetCard from "../components/budget/CategoryBudgetCard";

import WeeklyBudgetCard from "../components/budget/WeeklyBudgetCard";


const Budget = () => {

  const [monthlyBudget, setMonthlyBudget] = useState(null);

//   const [categoryBudgets, setCategoryBudgets] = useState([]);

  const [weeklyBudget, setWeeklyBudget] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const fetchBudgetData = async () => {

    try {

      setLoading(true);

      setError("");

      // TEMP STATIC VALUES
      const month = 5;
      const year = 2026;


      // API CALLS
      const monthlyData =
        await getMonthlyBudget(month, year);

    //   const categoryData =
    //     await getCategoryBudgets(month, year);

      const weeklyData =
        await getWeeklyBudget();


      // STORE DATA
      setMonthlyBudget(monthlyData);

    //   setCategoryBudgets(categoryData);

      setWeeklyBudget(weeklyData);

    } catch (err) {

      console.log(err);

      setError("Failed to fetch budget data");

    } finally {

      setLoading(false);

    }
  };




  // ==============================
  // PAGE LOAD
  // ==============================

  useEffect(() => {

    fetchBudgetData();

  }, []);




  // ==============================
  // LOADING UI
  // ==============================

  if (loading) {
    return <h2>Loading...</h2>;
  }




  // ==============================
  // ERROR UI
  // ==============================

  if (error) {
    return <h2>{error}</h2>;
  }




  // ==============================
  // MAIN UI
  // ==============================

  return (
    <div>

      <h1>Budget Dashboard</h1>


      {/* MONTHLY BUDGET */}

      {
        monthlyBudget && (

          <BudgetCard
            budget={monthlyBudget}
          />

        )
      }


      {/* CATEGORY BUDGETS */}

      {/* {
        categoryBudgets.map((budget) => (

          <CategoryBudgetCard
            key={budget._id}
            budget={budget}
          />

        ))
      } */}


      {/* WEEKLY BUDGET */}

      {
        weeklyBudget && (

          <WeeklyBudgetCard
            budget={weeklyBudget}
          />

        )
      }

    </div>
  );
};

export default Budget;