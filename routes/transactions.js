const express = require("express")
const router = express.Router()


const transactions = require("../data/transactions")

router
    .route("/")
    .get((req, res) => {
        let allTransaction = []

        for (let account in transactions) {
            allTransaction.push(transactions[account])
        }

        allTransaction = allTransaction.flat()
        res.json({ allTransaction });
    })

module.exports = router;