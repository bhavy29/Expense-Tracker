import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddExpense from './features/expenses/AddExpense'
import Expenses from './features/expenses/Expenses'
import AddIncome from './features/income/AddIncome'
import Incomes from './features/income/Incomes'
import Profile from './pages/Profile'
import AddNew from './features/transactions/AddNew'
import Transactions from './features/transactions/Transactions'
import Budget from './pages/Budget'

const App = () => {

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addExpense"
          element={
            <ProtectedRoute>
              <AddExpense />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addIncome"
          element={
            <ProtectedRoute>
              <AddIncome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incomes"
          element={
            <ProtectedRoute>
              <Incomes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addnew"
          element={
            <ProtectedRoute>
              <AddNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />'
        <Route
          path="/budget"
          element={
            <ProtectedRoute>
              <Budget />
            </ProtectedRoute>
          }
        />
      </Routes>

    </div>
  )
}

export default App
