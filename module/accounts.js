const mongoose = require("mongoose")
const { type } = require("os")

const accounts = mongoose.Schema({
    email: {
        type: "String",
        require: "true"
    },
    name: {
        type: "String",
        require: "true"
    },

})


module.exports = mongoose.model("customers", accounts)