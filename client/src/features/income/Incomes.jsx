import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/DashboardNavbar'
import { income } from '../../services/incomeService'
import { deleteIncome } from '../../services/incomeService';
import './Income.css'

const Incomes = () => {
  const [incomes, setIncomes] = useState([])
  const [cat, setCat] = useState('All Categories')
  const [month, setMonth] = useState('All');
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    income().then(res => {
      setIncomes(res.data)
    })
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this income?')) return;

    try {
      await deleteIncome(id);
      setIncomes(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      alert('Failed to delete income');
    }
  };

  const handleFilter = async (value) => {
    setCat(value);
  }

  const filteredIncomes = incomes.filter(item => {
    const date = new Date(item.date);

    const matchCategory =
      cat === 'All Categories' || item.category === cat;

    const matchMonth =
      month === 'All' || date.getMonth() === Number(month);

    const matchYear =
      date.getFullYear() === year;

    return matchCategory && matchMonth && matchYear;
  });



  return (
    <>
      <NavBar />

      <div className="expenses-container">

        {/* HEADER */}
        <div className="expenses-header">
          <div>
            <h2>Incomes</h2>
            <p>View and manage all your incomes</p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="expenses-filters">
          <input type="text" placeholder="Search income..." />

          {/* CATEGORY */}
          <select value={cat} onChange={(e) => handleFilter(e.target.value)}>
            <option>All Categories</option>
            <option>Job</option>
            <option>Stocks</option>
            <option>Rent</option>
            <option>Business</option>
            <option>Freelance</option>
            <option>Other</option>
          </select>

          {/* MONTH */}
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="All">All Months</option>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select>

          {/* YEAR */}
          <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
        </div>

        {/* LIST */}
        <div className="expenses-list">
          {filteredIncomes.map((item) => (
            <div className="expense-item" key={item._id}>

              <div className="expense-left">
                <h4>{item.title}</h4>
                <span>
                  {item.category} •{" "}
                  {new Date(item.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="expense-right">
                <span className="amount">₹{item.amount}</span>
                <button title="Edit">✏️</button>
                <button
                  title="Delete"
                  onClick={() => handleDelete(item._id)}
                >
                  🗑️
                </button>
              </div>

            </div>
          ))}
        </div>


      </div>
    </>
  )
}

export default Incomes
