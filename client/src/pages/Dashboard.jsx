import Navbar from '../components/NavBar'
import StatCards from '../components/StatCards'
import MonthlyFilterSection from '../components/MonthlyFilterSection'

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <StatCards/>
      <MonthlyFilterSection />
    </div>
  )
}

export default Dashboard
