const User = require('../models/user.model')
const Expense = require('../models/expense.model')
const Income = require('../models/income.model')

exports.deleteUser = async (req, res) => {
    console.log("Delete user request received for user ID:", req.user.id);
    try {
        const userId = req.user.id;
        
        // delete all transactions associated with the user
        await Expense.deleteMany({ user: userId });
        await Income.deleteMany({ user: userId });
        
        // delete the user
        const user = await User.findByIdAndDelete(userId);
        console.log("User deletion result:", user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.clearCookie('token');

        res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}
    