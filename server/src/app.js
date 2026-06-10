require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', require('./routes/auth.routes'))
app.use('/user',require('./routes/user.routes'))
app.use('/expenses', require('./routes/expense.routes'))
app.use('/income', require('./routes/income.routes'))
app.use('/report', require('./routes/monthlyReport.route'))
app.use('/budget', require('./routes/budget.routes'))
module.exports = app;