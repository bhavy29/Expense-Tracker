import { useState } from "react";
import { setMonthlyBudget, getMonthlyBudget } from "../services/budgetService";
import "./BudgetCard.css";
import DashboardNavbar from "./NavBar/DashboardNavbar";

const BudgetCard = () => {
  const currDate = new Date();

  const [input, setInput] = useState("");
  const [budget, setBudget] = useState(0);
  const [month, setMonth] = useState(currDate.getMonth() + 1);
  const [year, setYear] = useState(currDate.getFullYear());

  // Set month and year using input 
  const setMonthYear = (e) => {
    const [year, month] = e.target.value.split("-");
    setYear(year);
    setMonth(month);
    console.log("Selected Month:", month, "Selected Year:", year);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!month || !year) {
      alert("Please select month and year");
      return;
    }
    try {
      await setMonthlyBudget({
        amount: Number(input),
        month: Number(month),
        year: Number(year)
      });
      console.log("Budget set successfully!");
      alert("Budget set successfully!");

      const res = await getMonthlyBudget(year, month);
      setBudget(res.data?.amount || 0);
    } catch (error) {
      console.error("Error setting budget:", error);
      alert("Failed to set budget. Please try again.");
    }
  };


  return (
    <>

     <DashboardNavbar/> 

    <div className="budget-container">
      {/* Set Budget */}
      <h2>Set Monthly Budget</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter Budget"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <input
          type="month"
          value={`${year}-${String(month).padStart(2, '0')}`}
          onChange={setMonthYear}
        />
        <button type="submit">Set Budget</button>
      </form>

      {/* Show Budget  */}
      <h3>Current Budget: ₹{budget}</h3>
    </div>
    </>
  );
};

export default BudgetCard;