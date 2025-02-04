const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    transaction_code: { type: String, required: true },
    symbol: { type: String, required: true },
    price: { type: mongoose.Schema.Types.Decimal128, required: true }, 
    total: { type: mongoose.Schema.Types.Decimal128, required: true }  
});

const transactions = new mongoose.Schema({
    "account_id": Number,
    "transactions": { type: [transactionSchema], default: [] } 
},
)


module.exports = mongoose.model("transactions", transactions)