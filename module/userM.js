const mongoose = require("mongoose")

const accounts = mongoose.Schema({
    email: {
        type: "String",
        require: "true"
    },
    name: {
        type: "String",
        require: "true"
    },
    accounts: [Number]

})


module.exports = mongoose.model("customers", accounts)