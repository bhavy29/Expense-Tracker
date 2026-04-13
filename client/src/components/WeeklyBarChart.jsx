import { useEffect, useState } from "react";
import { get7daysExpense } from "../services/expenseService";
import { get7daysIncome } from "../services/incomeService";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./WeeklyBarChart.css";

const WeeklyBarChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expenseResponse, incomeResponse] = await Promise.all([
          get7daysExpense(),
          get7daysIncome()
        ]);

        const merged = incomeResponse.data.map(incomeItem => {
          const expenseItem = expenseResponse.data.find(
            exp => exp.date === incomeItem.date
          );
          return {
            date: incomeItem.date,
            income: incomeItem.income,
            expense: expenseItem ? expenseItem.expense : 0,
            day: new Date(incomeItem.date).toLocaleDateString("en-US", {
              weekday: "short"
            })
          };
        });
        setData(merged);
      } catch (error) {
        console.error("Error fetching weekly data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <h2 className="chart-title">Last 7 Days Overview</h2>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend />

            <Bar dataKey="income" fill="#22c55e" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default WeeklyBarChart
