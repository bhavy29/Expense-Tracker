import React, { useState, useEffect } from "react";
import BudgetForm from "../components/budget/BudgetForm";
import Navbar from "../components/NavBar/DashboardNavbar";
import styles from "./Budget.module.css";
import { getMonthlyBudget} from "../services/budgetService";
import { getMonthlyExpense } from "../services/expenseService";

const Budget = () => {
  const [showForm, setShowForm] = useState(false);

  const [monthlyBudget, setMonthlyBudget] = useState(null);
  const [monthlyExpense, setMonthlyExpense] = useState(null);

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
  }, []);

  const percentage =
    ((monthlyExpense || 0) /
      (monthlyBudget?.amount || 1)) *
    100;

  const remaining =
    (monthlyBudget?.amount || 0) -
    (monthlyExpense || 0);

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
    </div>
  );
};

export default Budget;