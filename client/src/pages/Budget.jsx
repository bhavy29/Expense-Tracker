import React, { useState } from "react";
import BudgetForm from "../components/budget/BudgetForm";

const Budget = () => {

  const [showForm, setShowForm] = useState(false);

  return (
    <div>

      <h1>Budget Dashboard</h1>
      <button
        className="add-budget-btn"
        onClick={() => setShowForm(true)}
      >
        +
      </button>
      {
        showForm && (
          <BudgetForm
            onClose={() => setShowForm(false)}
          />
        )
      }

    </div>
  );
};

export default Budget;