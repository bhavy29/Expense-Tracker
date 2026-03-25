import AddExpense from './AddExpense'
import AddIncome from './AddIncome'
import NavBar from './NavBar'
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
