import { useEffect, useState } from 'react'
import { getMonthlyIncome, getCategoryWiseIncome } from '../../services/incomeService'
import { getMonthlyExpense, getCategoryWiseExpense } from '../../services/expenseService'
import { downloadMonthlyPDF, downloadYearlyPDF} from '../../services/monthlyReport'
import './MonthlyFilterSection.css'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'


const MonthlyFilterSection = () => {
  const today = new Date()

  const [month, setMonth] = useState(today.getMonth() + 1)
  const [year, setYear] = useState(today.getFullYear())
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [dataE, setDataE] = useState([])
  const [dataI, setDataI] = useState([])

  useEffect(() => {
    getMonthlyIncome(year, month).then(res => setIncome(res.data))
    getMonthlyExpense(year, month).then(res => setExpense(res.data))
    getCategoryWiseExpense(year, month).then(res => { setDataE(res.data) })
    getCategoryWiseIncome(year, month).then(res => { setDataI(res.data) })
  }, [month, year])

  // ------------------------------------------

  const COLORS = [
    '#22c55e', // green
    '#9333ea', // purple
    '#ef4444', // red
    '#3b82f6', // blue
    '#f97316', // orange
    '#14b8a6', // teal
    '#a855f7'
  ]


  // ------------------------------------------

  return (
    <div className="monthly-section">

      {/* FILTER */}
      <div className="month-filter">
        <label>Filter by month</label>
        <input
          type="month"
          value={`${year}-${String(month).padStart(2, '0')}`}
          onChange={(e) => {
            const [y, m] = e.target.value.split('-')
            setYear(Number(y))
            setMonth(Number(m))
          }}
        />
      </div>

      {/* CARDS */}
      <div className="monthly-cards">

        <div className="monthly-card income">
          <p>Income of selected month</p>
          <h2>₹ {income.toLocaleString()}</h2>
        </div>

        <div className="monthly-card expense">
          <p>Expense of selected month</p>
          <h2>₹ {expense.toLocaleString()}</h2>
        </div>

        <div className="monthly-card saving">
          <p>Savings</p>
          <h2>₹ {(income - expense).toLocaleString()}</h2>
        </div>

      </div>

      <button className="download-btn" onClick={() => downloadMonthlyPDF(year, month)}>
        📄 Download Monthly Report
      </button>
      <button className="download-btn" onClick={() => downloadYearlyPDF(year)}>
        📄 Download Yearly Report
      </button>


      <div className="pie-section">
        {/* -------------- */}

        {dataE.length === 0 ? (
          <></>
        ) : (
          <div className="pie-card">
            <h3>Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataE}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {dataE.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip formatter={(v) => `₹ ${v}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        {/* -------------- */}
        {/* -------------- */}

        {dataI.length === 0 ? (
          <></>
        ) : (
          <div className="pie-card">
            <h3>Income Breakdown</h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataI}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {dataI.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip formatter={(v) => `₹ ${v}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        {/* -------------- */}
      </div>

    </div>
  )
}


export default MonthlyFilterSection
