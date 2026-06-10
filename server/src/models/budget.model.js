const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  type: {
    type: String,
    enum: ["monthly", "weekly", "category"],
    required: true,
  },

  category: {
    type: String,
    default: null,
  },

  amount: {
    type: Number,
    required: true,
  },

  spent: {
    type: Number,
    default: 0,
  },

  month: Number,
  year: Number,

  weekStart: Date,
  weekEnd: Date,
});

module.exports = mongoose.model('Budget', budgetSchema)