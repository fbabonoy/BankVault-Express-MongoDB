const mongoose = require("mongoose")

const auth = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,  // Ensures no duplicate emails
        lowercase: true,
        trim: true     // Removes whitespace
    },
    password: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("authentication", auth)