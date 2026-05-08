import { useEffect, useState } from "react";
import { setMonthlyBudget, getMonthlyBudget, updateMonthlyBudget } from "../services/budgetService";
import "./BudgetCard.css";
import DashboardNavbar from "./NavBar/DashboardNavbar";

const BudgetCard = () => {
  const currDate = new Date();

  const [input, setInput] = useState("");
  const [budget, setBudget] = useState(0);
  const [month, setMonth] = useState(currDate.getMonth() + 1);
  const [year, setYear] = useState(currDate.getFullYear());

  // Handle month/year input
  const setMonthYear = (e) => {
    const [y, m] = e.target.value.split("-");
    setYear(Number(y));
    setMonth(Number(m));
  };

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await getMonthlyBudget(year, month);
        setBudget(res.data?.amount || 0);
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };
    fetchBudget()
  }, [year, month]);

  // Handle submit
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!month || !year) {
    alert("Please select month and year");
    return;
  }

  if (!input || Number(input) <= 0) {
    alert("Please enter valid budget");
    return;
  }

  try {
    const existingBudget = await getMonthlyBudget(year, month);
    console.log("Existing budget:", existingBudget.data);
    if (existingBudget.data) {

      await updateMonthlyBudget(
        existingBudget.data._id,
        {
          amount: Number(input)
        },
        year,
        month
      );

      alert("Budget updated successfully!");

    } else {

      await setMonthlyBudget({
        amount: Number(input),
        month,
        year
      });

      alert("Budget added successfully!");
    }

    setBudget({
      amount: Number(input)
    });

    setInput("");

  } catch (error) {
    console.error("Error updating budget:", error);
    alert("Failed to update budget");
  }
};

  return (
    <>
      <DashboardNavbar />

      <div className="budget-container">
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
            value={`${year}-${String(month).padStart(2, "0")}`}
            onChange={setMonthYear}
          />

          <button type="submit">Set Budget</button>
        </form>

        <h3>Current Budget: ₹{budget}</h3>
      </div>
    </>
  );
};

export default BudgetCard;