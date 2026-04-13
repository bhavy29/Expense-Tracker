import AddExpense from '../../features/expenses/AddExpense'
import AddIncome from '../../features/income/AddIncome'
import NavBar from './../../components/NavBar/DashboardNavbar'
import './AddNew.css'

const AddNew = () => {
    return (
        <div className="addnew-page">
            <NavBar />

            <div className="addnew-wrapper">
                <div className="addnew-card expense-card">
                    <AddExpense />
                </div>

                <div className="addnew-card income-card">
                    <AddIncome />
                </div>
            </div>
        </div>

    )
}

export default AddNew
