import React from 'react'
import { useState } from 'react'
import { addIncome } from '../services/incomeService'
import { useNavigate } from 'react-router-dom'
import './AddExpense.css'
import NavBar from './NavBar'

const AddIncome = () => {
    const [form, setForm] = useState({
        title: '',
        amount: '',
        category: '',
        date: ''
    });


    const navigate = useNavigate()


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addIncome(form);
            alert("Income added successfully");
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to add income');
        }
    };

    return (
        <div>
            {/* <NavBar /> */}
            <div className="add-expense-container">
                <form className="add-expense-card" onSubmit={handleSubmit}>
                    <h2 className="form-title">Add Income</h2>

                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            placeholder="Income title (e.g. Salary)"
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
                            <option>Job</option>
                            <option>Stocks</option>
                            <option>Rent</option>
                            <option>Business</option>
                            <option>Freelance</option>
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

                   <button className="income-btn">Add Income</button>


                </form>
            </div>
        </div>

    )
}

export default AddIncome
