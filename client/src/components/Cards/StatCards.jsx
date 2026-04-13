import { useEffect, useState, useRef } from 'react'
import { exp } from '../../services/authService'
import { income } from '../../services/incomeService'
import { useNavigate, Link } from 'react-router-dom'
import './StatCards.css'


const StatCards = () => {
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  const [openMenu, setOpenMenu] = useState(null);
  const incomeMenuRef = useRef(null);
  const expenseMenuRef = useRef(null);
  const navigate = useNavigate()


  useEffect(() => {
    // FETCH EXPENSES
    exp().then(res => {
      const expenseTotal = res.data.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      )
      setTotalExpense(expenseTotal)
    })

    // FETCH INCOMES
    income().then(res => {
      const incomeTotal = res.data.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      )
      setTotalIncome(incomeTotal)
    })

    const handleClickOutside = (e) => {
      if (
        incomeMenuRef.current &&
        !incomeMenuRef.current.contains(e.target) &&
        expenseMenuRef.current &&
        !expenseMenuRef.current.contains(e.target)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  const allIncome = () => {
    navigate('/incomes');
  };
  const addIncome = () => {
    navigate('/addIncome');
  };
  const allExpenses = () => {
    navigate('/expenses');
  };
  const addExpense = () => {
    navigate('/addExpense');
  };

  return (
    <div className="stats-wrapper">

      {/* INCOME */}
      <div className="stat-card">
        <div className="stat-top">
          <span className="icon income">₹</span>
          {/* <span className="dots">⋯</span> */}
          <div className="menu-wrapper" ref={incomeMenuRef}>
            <span className="dots" onClick={() => setOpenMenu("income")}>
              ⋯
            </span>

            {openMenu === "income" && (
              <div className="menu">
                <button onClick={allIncome}>View Income</button>
                <button onClick={addIncome}>Add Income</button>
                <button className="danger">Delete</button>
              </div>
            )}
          </div>

        </div>
        <p className="stat-title">TOTAL INCOME</p>
        <h2>₹ {totalIncome.toLocaleString()}</h2>
      </div>

      {/* EXPENSE */}
      <div className="stat-card highlight">
        <div className="stat-top">
          <span className="icon expense">⟳</span>
          <div className="menu-wrapper" ref={expenseMenuRef}>
            <span className="dots" onClick={() => setOpenMenu("expense")}>
              ⋯
            </span>

            {openMenu === "expense" && (
              <div className="menu">
                <button onClick={allExpenses}>View Expenses</button>
                <button onClick={addExpense}>Add Expense</button>
                <button className="danger">Report</button>
              </div>
            )}
          </div>

        </div>
        <p className="stat-title">TOTAL EXPENSE</p>
        <h2>₹ {totalExpense.toLocaleString()}</h2>
      </div>

      {/* SAVINGS */}
      <div className="stat-card">
        <div className="stat-top">
          <span className="icon savings">⚡</span>
          <span className="view-btn">View Details</span>
        </div>
        <p className="stat-title">TOTAL SAVINGS</p>
        <h2>₹ {(totalIncome - totalExpense).toLocaleString()}</h2>
      </div>

    </div>
  )
}

export default StatCards
