const express = require("express")
const router = express.Router()


const auth = require("../module/auth")



router
  .route("/")
    .post(async (req, res, next) => {
        let newEmail = req.body.email
        let newPassword = req.body.password

        const check = await auth.find({email: newEmail})
        
        if (check.length === 0) {
            const user =  await auth.create({
                email: newEmail,
                password: newPassword
            });
            res.send({report:"account created"})

        } else {
            res.send({report:"email already in use"})

        }

     
        
    })

    module.exports = router