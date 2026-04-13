const mongoose = require('mongoose')

const budgetSchema = mongoose.Schema(
    {
        amount: Number,
        month: Number,
        year: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
)

module.exports = mongoose.model('Budget', budgetSchema)