import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/DashboardNavbar'
import { income } from '../../services/incomeService'
import { exp } from '../../services/authService'
import './Transactions.css'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await income()
        const expenseRes = await exp()

        const incomeData = incomeRes.data.map(item => ({
          ...item,
          type: 'income'
        }))

        const expenseData = expenseRes.data.map(item => ({
          ...item,
          type: 'expense'
        }))

        const merged = [...incomeData, ...expenseData]

        // Sort by date (latest first)
        merged.sort((a, b) => new Date(b.date) - new Date(a.date))

        setTransactions(merged)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <NavBar />

      <div className="transactions-page">
        <h2>Transactions</h2>

        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((item) => (
            <div className="transaction-card" key={item._id}>

              <div className="transaction-left">
                <h4>{item.title}</h4>
                <p>
                  {item.category} •{" "}
                  {new Date(item.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className={`transaction-right ${item.type}`}>
                {item.type === 'income' ? '+' : '-'}
                ₹{item.amount}
              </div>

            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Transactions
