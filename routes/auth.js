const express = require("express")
const router = express.Router()
const emails = require("../data/logIn")

const path = require("path");


// Serve CSS and JS from "assets" folder (one level up)

router
    .route("/")
    .get((req, res)=>{
                
        res.sendFile(path.join(__dirname,"..", "logInPage", "index.html"));
    })
    .post((req, res, next) => {


        let email = req.body.email
        let password = req.body.password

        if (email && password && emails[email] === password) {

            res.redirect(`/users/${email + password}/?api-key=${"admin"}`)
        } else {
            next()
        }
    })

module.exports = router