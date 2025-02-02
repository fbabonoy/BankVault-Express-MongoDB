const express = require("express")
const router = express.Router()

const userModule = require("../module/userM")
const moduleTransactions = require("../module/transactions")


router
    .route("/")
    .get(async (req, res) => {
        const links = [{
            href: "/accounts/:id",
            rel: "_id",
            type: "GET"
        }];
        const data = await userModule.find().limit(30)
        res.json({ users: data, links });

    })
    // .post((req, res, next) => {


    //     if (req.body.accountHolder && req.body.email && req.body.password && !(req.body.email in emailsInUse)) {
    //         let acc = ""

    //         do {
    //             acc = "ACC" + Math.floor(Math.random() * 1000000)
    //         } while (acc in transactions)

    //         transactions[acc] = []
    //         emailsInUse[req.body.email] = req.body.password

    //         const newAccount = {
    //             accountHolder: req.body.accountHolder,
    //             accountNumber: acc,
    //             balance: 300.0,
    //             email: req.body.email,
    //             password: req.body.password
    //         }
    //         const id = newAccount.email + newAccount.password

    //         accounts[id] = newAccount
    //         res.json({ newAccount });
    //     }
    //     else next();

    // })

router
    .route("/:id")
    .get(async (req, res, next) => {
        let id = req.params.id
        try {
            const links = [
                {
                    href: `/${req.params.id}`,
                    rel: "",
                    type: "PATCH",
                },
                {
                    href: `/${req.params.id}`,
                    rel: "",
                    type: "DELETE",
                },
                {
                    href: `/${req.params.id}/transactions`,
                    rel: "id",
                    type: "GET",
                },
                {
                    href: `/${req.params.id}/deposit`,
                    rel: "id",
                    type: "POST",
                },
                {
                    href: `/${req.params.id}/withdraw`,
                    rel: "id",
                    type: "POST",
                },
            ];


            const data = await userModule.findById(id)
            res.json({ user: data, links });
        }
        catch (error) {
            console.log(error);
            next()
        }

    }
    )
    .patch(async (req, res, next) => {
        try {
            await userModule.findByIdAndUpdate(req.params.id, req.body)

            res.json({ "response": "Updated" })

        } catch (error) {
            console.log(error);
            next()
        }


    })
    .delete(async (req, res, next) => {
        const result = await userModule.findByIdAndDelete(req.params.id)
        console.log(result)
        res.json('User deleted.')
    })

// router
//     .route("/:id/deposit")
//     .post((req, res, next) => {

//         let account = accounts[req.params.id]
//         account.balance += req.body.amount;
//         let transactionsAccount = transactions[account.accountNumber]

//         let deposit = {
//             transactionId: `txn${transactionsAccount.length + 1}`,
//             type: "deposit",
//             amount: req.body.amount,
//             date: new Date()
//         }

//         transactionsAccount.push(deposit)

//         if (req.body.amount) res.json({ transaction: deposit })
//         else next();
//     })

///////////////////////////////////////////////////////////////////////////////////////////////////////

// router
//     .route("/:id/withdraw")
//     .post((req, res, next) => {

//         let account = accounts[req.params.id]
//         account.balance -= req.body.amount;
//         let transactionsAccount = transactions[account.accountNumber]

//         let withdraw = {
//             transactionId: `txn${transactionsAccount.length + 1}`,
//             type: "withdraw",
//             amount: req.body.amount,
//             date: new Date()
//         }

//         transactionsAccount.push(withdraw)

//         if (req.body.amount) res.json({ withdraw })
//         else next();
//     })

router
    .route("/:id/transactions")
    .get(async (req, res, next) => {

        const link = [
            {
                href: `/${req.params.id}/transactions/:transactionId`,
                rel: "id",
                type: "GET",
            }
        ]

        try {

            let userTransfers = await userModule.findById(req.params.id)
            let accoutns = []

            for (let account of userTransfers.accounts) {
                const data = await moduleTransactions.find({ account_id: account })
                if (data) {
                    accoutns.push(data.pop())
                }
            }

            res.json({ accoutns, link })
        } catch (error) {
            console.log(error)
            next()
        }
    })





// router
//     .route("/:id/transactions/:transactionId")
//     .get((req, res, next) => {

//         const link = [
//             {
//                 href: `/${req.params.id}/transactions/:transactionId`,
//                 rel: "id",
//                 type: "DELETE",
//             },
//         ]


//         let userTransfers = transactions[accounts[req.params.id].accountNumber]
//         let transfer = userTransfers.filter((transfer) => {
//             // console.log(transfer.transactionId);
//             return transfer.transactionId === req.params.transactionId
//         })
//         if (transactions) res.json({ transfer, link })
//         else next();
//     })
//     .delete((req, res, next) => {
//         let userTransfers = transactions[accounts[req.params.id].accountNumber]
//         let transactionId = req.params.transactionId
//         let deleted
//         userTransfers.forEach((transfer, index) => {
//             if (transfer.transactionId === transactionId) {
//                 deleted = userTransfers[index]
//                 userTransfers.splice(index, 1)
//             }
//         });

//         if (deleted) res.json({ deleted });
//         else next();
//     })

module.exports = router;
