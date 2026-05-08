import { useState } from 'react'
import { addExpense } from '../../services/expenseService'
import { useNavigate } from 'react-router-dom'
import './Expenses.css'
import NavBar from '../../components/NavBar/DashboardNavbar'

const AddExpense = ({ onExpenseAdded }) => {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: ''
  })

  const navigate = useNavigate()


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await addExpense({
        ...form,
        amount: Number(form.amount)
      })

      console.log('New Expense added')

      // Optional callback
      if (onExpenseAdded) {
        onExpenseAdded(res.data)
      }

      navigate('/dashboard')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add expense')
    }
  }

  return (
    <div>
      {/* <NavBar/> */}
      <div className="add-expense-container">
        <form className="add-expense-card" onSubmit={handleSubmit}>
          <h2 className="form-title">Add Expense</h2>

          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Expense title (e.g. Pizza)"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Entertainment</option>
              <option>Health</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <button className="expense-btn">Add Expense</button>

        </form>
      </div>
    </div>

  )
}

export default AddExpense
