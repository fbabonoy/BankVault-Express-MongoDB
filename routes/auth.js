const express = require("express")
const router = express.Router()

const path = require("path");
const auth = require("../module/auth")



router
    .route("/")
    .get(async (req, res) => {
        let user = await auth.find({email: `virginia363@hotmail.com`})
        
        if (user.length < 1) {
            createNewUser()
        }

        res.sendFile(path.join(__dirname, "..", "logInPage", "index.html"));
    })
    .post(async (req, res, next) => {
        let emailCheck = req.body.email
        let passwordCheck = req.body.password

        const user = await auth.find({email: emailCheck, password: passwordCheck})
                
        if (user.length > 0) {
            res.send({ condition: "login successful" })

            // res.redirect(`/users/${email + password}/?api-key=${"admin"}`)
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
    }
}

module.exports = router