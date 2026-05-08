import { useEffect, useState } from 'react'
import { allExp } from '../../services/expenseService'
import { deleteExpense } from '../../services/expenseService';
import NavBar from '../../components/NavBar/DashboardNavbar'
import './Expenses.css'

const Expenses = () => {
    const [expenses, setExpenses] = useState([])
    const [cat, setCat] = useState('All Categories')
    const [month, setMonth] = useState('All');
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        allExp().then(res => {
            setExpenses(res.data)
        })
    }, [])

    const filteredExpenses = expenses.filter(item => {
        const date = new Date(item.date);

        const matchCategory =
            cat === 'All Categories' || item.category === cat;

        const matchMonth =
            month === 'All' || date.getMonth() === Number(month);

        const matchYear =
            date.getFullYear() === year;

        return matchCategory && matchMonth && matchYear;
    });


    const handleDelete = async (id) => {
        if (!window.confirm('Delete this expense?')) return;

        try {
            await deleteExpense(id);
            setExpenses(prev => prev.filter(item => item._id !== id));
        } catch (error) {
            alert('Failed to delete expense');
        }
    };

    const handleFilter = async (value) => {
        setCat(value);
    }

    return (
        <>
            <NavBar />

            <div className="expenses-container">

                {/* HEADER */}
                <div className="expenses-header">
                    <div>
                        <h2>Expenses</h2>
                        <p>View and manage all your expenses</p>
                    </div>
                </div>

                {/* FILTERS */}
                <div className="expenses-filters">
                    <input type="text" placeholder="Search expense..." />

                    {/* CATEGORY */}
                    <select value={cat} onChange={(e) => handleFilter(e.target.value)}>
                        <option>All Categories</option>
                        <option>Food</option>
                        <option>Transport</option>
                        <option>Shopping</option>
                        <option>Bills</option>
                        <option>Entertainment</option>
                        <option>Health</option>
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

                <h2>
                    Expenses — {month === 'All'
                        ? 'All Months'
                        : new Date(0, month).toLocaleString('default', { month: 'long' })}
                </h2>


                {/* LIST */}
                <div className="expenses-list">

                    {filteredExpenses.map((item) => (
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
                                <button title="Delete" onClick={() => handleDelete(item._id)}>
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

export default Expenses
