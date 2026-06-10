import React, { useState } from 'react'
import { setWeeklyBudget, setMonthlyBudget } from '../../services/budgetService'

import './BudgetForm.css'

const BudgetForm = ({ onClose }) => {
  const [form, setForm] = useState({
    type: 'monthly',
    month: new Date().toISOString().slice(0, 7),
    amount: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const budgetData = {
      type: form.type,
      amount: Number(form.amount)
    }

    if (form.type === 'monthly') {
      const [year, month] = form.month.split('-')

      budgetData.month = Number(month)
      budgetData.year = Number(year)

      try {
        const res = await setMonthlyBudget(budgetData)

        alert(res.message || 'Budget set successfully!')
      } catch (err) {
        console.error(err)

        alert(
          err.response?.data?.message ||
          'Failed to set budget'
        )
      }
    }

    else if (form.type === 'weekly') {
      const currentDate = new Date()
      const firstDayOfWeek = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay())
      )

      budgetData.weekStart = firstDayOfWeek
      budgetData.weekEnd = new Date(
        firstDayOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000
      )

      try {
        const res = await setWeeklyBudget(budgetData)
        alert(res.message || 'Budget set successfully!')
      } catch (err) {
        console.error(err)
        alert(
          err.response?.data?.message ||
          'Failed to set budget'
        )
      }
    }
    console.log(budgetData)
  }

  return (
    <div className="budget-container">
      <button
        type="button"
        className="close-btn"
        onClick={onClose}
      >
        ✕
      </button>
      <form className="budget-card" onSubmit={handleSubmit}>
        
        <h2 className="budget-title">Set Budget</h2>

        <p className="budget-subtitle">
          Manage your weekly and monthly spending goals
        </p>

        <div className="form-group">
          <label>Budget Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {form.type === 'monthly' && (
          <div className="form-group">
            <label>Select Month</label>
            <input
              type="month"
              name="month"
              value={form.month}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Budget Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter budget amount"
            value={form.amount}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <button type="submit" className="budget-btn">
          Set Budget
        </button>
      </form>
      
    </div>
  )
}

export default BudgetForm

