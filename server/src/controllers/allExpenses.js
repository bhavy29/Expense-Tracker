const User = require('../models/user.model')
const Expense = require('../models/expense.model')

exports.allExp = async(req,res)=>{
    const user = await User.findById(req.user.id).select('-password')
    const id = user.id
    const exp = await Expense.find({user:id})
    res.json(exp)
}