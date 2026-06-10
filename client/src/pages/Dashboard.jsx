import Navbar from '../components/NavBar/DashboardNavbar'
import StatCards from '../components/Cards/StatCards'
import MonthlyFilterSection from '../components/Filters/MonthlyFilterSection'
import WeeklyBarChart from '../components/WeeklyBarChart'
// import BudgetCard from '../components/BudgetCard'

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <StatCards/>
      <MonthlyFilterSection />
      <WeeklyBarChart/>
    </div>
  )
}

export default Dashboard
