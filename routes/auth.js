const express = require("express")
const router = express.Router()

const path = require("path");
const auth = require("../module/auth")
const users = require("../module/userM")




router
    .route("/")
    .get(async (req, res) => {
        let user = await auth.find({ email: `virginia363@hotmail.com` })

        if (user.length < 1) {
            createNewUser()
        }

        res.send(user)
    })
    .post(async (req, res, next) => {
        let emailCheck = req.body.email
        let passwordCheck = req.body.password

        const user = await auth.find({ email: emailCheck, password: passwordCheck })

        if (user.length > 0) {
            res.send({ condition: "login successful" })

        } else {
            next()
        }
    })


async function createNewUser() {
    for (let x = 1; x < 31; x++) {
        await auth.create({
            email: `virginia36${x}@hotmail.com`,
            password: `password${x}`
        });


        let user = {
            "username": `johnsonshelly${x}`,
            "name": `Jacqueline Haynes${x}`,
            "address": `USNS Howard\nFPO AP 303${x}`,
            "birthdate": `1982-${x}-01T07:12:57.000Z`,
            "email": `virginia36${x}@hotmail.com`,
            "accounts": [
                6319010 + x,
                8146870 + x
            ]
        }

        await users.create(user)

    }
}

module.exports = router