// const mongoose = require('mongoose')

// const userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true 
//     },
//     password: {
//         type: String,
//         required: true,
//     },

// })

// module.exports = mongoose.model('User',userSchema)

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true, lowercase: true },

    // old system
    password: String,

    // new system
    auth0Id: { type: String, unique: true, sparse: true },

    createdAt: { type: Date, default: Date.now },
    image: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)
