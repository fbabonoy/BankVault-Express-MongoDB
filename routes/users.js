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
                }
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

router
    .route("/:id/transactions")
    .get(async (req, res, next) => {

        const link = [
            {
                href: `/${req.params.id}/:accountNum`,
                rel: "get transaction on account",
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


    router
    .route("/:id/:accountNum")
    .get(async (req, res, next) => {

        try {

            let userTransfers = await userModule.findById(req.params.id)
            let data = await moduleTransactions.find({account_id: req.params.accountNum}, { transactions: 1, _id: 0 })

           for (let account of userTransfers.accounts) {
                if (account == req.params.accountNum) {
                    res.json(data[0].transactions)
                } 
            }



        } catch (error) {
            console.log(error)
            next()
        }
    })

module.exports = router;
