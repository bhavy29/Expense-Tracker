import React, { useState, useEffect } from "react";
import BudgetForm from "../components/budget/BudgetForm";
import Navbar from "../components/NavBar/DashboardNavbar";
import styles from "./Budget.module.css";
import { getMonthlyBudget, getWeeklyBudget } from "../services/budgetService";
import { getMonthlyExpense, get7daysExpense } from "../services/expenseService";

const Budget = () => {
  const [showForm, setShowForm] = useState(false);

  const [monthlyBudget, setMonthlyBudget] = useState(null);
  const [monthlyExpense, setMonthlyExpense] = useState(null);
  const [weeklyBudget, setWeeklyBudget] = useState(null);
  const [weeklyExpense, setWeeklyExpense] = useState(null);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const data = await getMonthlyBudget(
          new Date().getMonth() + 1,
          new Date().getFullYear()
        );
        setMonthlyBudget(data);
      } catch (error) {
        console.error("Error fetching monthly budget:", error);
      }
    };

    // Fetch weekly budget and expenses if needed
    const fetchWeeklyBudget = async () => {
      try {
        const data = await getWeeklyBudget();
        setWeeklyBudget(data);
      }
      catch (error) {
        console.error("Error fetching weekly budget:", error);
      }
    };

    const fetchWeeklyExpense = async () => {
      try {
        const data = await get7daysExpense();
        let sum = 0;
        for(let i = 0; i < 7; i++) {
          sum += data.data[i].expense;          
        }
        setWeeklyExpense(sum);
      } catch (error) {
        console.error("Error fetching weekly expense:", error);
      }
    };

    const fetchExpense = async () => {
      try {
        const data = await getMonthlyExpense(
          new Date().getFullYear(),
          new Date().getMonth() + 1
        );
        setMonthlyExpense(data.data);
      } catch (error) {
        console.error("Error fetching monthly expense:", error);
      }
    };

    fetchBudget();
    fetchExpense();
    fetchWeeklyBudget();
    fetchWeeklyExpense();
  }, []);

  const percentage =
    ((monthlyExpense || 0) /
      (monthlyBudget?.amount || 1)) *
    100;

  const remaining =
    (monthlyBudget?.amount || 0) -
    (monthlyExpense || 0);

  const weeklyPercentage =
    ((weeklyExpense || 0) /
      (weeklyBudget?.amount || 1)) *
    100;
  const weeklyRemaining =
    (weeklyBudget?.amount || 0) -
    (weeklyExpense || 0);

  return (
    <div>
      <Navbar />

      <button
        className={styles.addBudgetBtn}
        onClick={() => setShowForm(true)}
      >
        +
      </button>

      {showForm && (
        <BudgetForm
          onClose={() => setShowForm(false)}
        />
      )}

      <div className={styles.budgetDisplay}>
        <h2 className={styles.budgetTitle}>
          Monthly Budget Overview
        </h2>

        <div className={styles.budgetInfo}>
          <span>₹{monthlyExpense || 0}</span>
          <span>₹{monthlyBudget?.amount || 0}</span>
        </div>

        <div className={styles.progressBar}>
          <div
            className={`${styles.progressFill} ${percentage < 70
              ? styles.safe
              : percentage < 90
                ? styles.warning
                : styles.danger
              }`}
            style={{
              width: `${Math.min(
                percentage,
                100
              )}%`,
            }}
          />
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h4>Budget</h4>
            <p>
              ₹{monthlyBudget?.amount || 0}
            </p>
          </div>

          <div className={styles.statCard}>
            <h4>Spent</h4>
            <p>₹{monthlyExpense || 0}</p>
          </div>

          <div className={styles.statCard}>
            <h4>Remaining</h4>
            <p>
              ₹{remaining.toFixed(2)}
            </p>
          </div>

          <div className={styles.statCard}>
            <h4>Used</h4>
            <p>
              {percentage.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className={styles.budgetDisplay}>
        <h2 className={styles.budgetTitle}>
          Weekly Budget Overview
        </h2>

        <div className={styles.budgetInfo}>
          <span>₹{weeklyExpense || 0}</span>
          <span>₹{weeklyBudget?.amount || 0}</span>
        </div>

        <div className={styles.progressBar}>
          <div
            className={`${styles.progressFill} ${weeklyPercentage < 70
              ? styles.safe
              : weeklyPercentage < 90
                ? styles.warning
                : styles.danger
              }`}
            style={{
              width: `${Math.min(
                weeklyPercentage,
                100
              )}%`,
            }}
          />
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h4>Budget</h4>
            <p>
              ₹{weeklyBudget?.amount || 0}
            </p>
          </div>

          <div className={styles.statCard}>
            <h4>Spent</h4>
            <p>₹{weeklyExpense || 0}</p>
          </div>

          <div className={styles.statCard}>
            <h4>Remaining</h4>
            <p>
              ₹{weeklyRemaining.toFixed(2)}
            </p>
          </div>

          <div className={styles.statCard}>
            <h4>Used</h4>
            <p>
              {weeklyPercentage.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;