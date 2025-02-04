const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();


const auth = require("./routes/auth");
const register = require("./routes/register")
const users = require("./routes/users");

const error = require("./utilities/error.mjs");

const app = express();
const port = 8085;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connected to mongodb")
    })
    .catch((e)=>{
        console.log(e);
    })

app.use(express.json())

app.use("/auth", auth);
app.use("/register", register);
app.use("/accounts", users);

app.get("/", (req, res) => {
    res.json({
        links: [
            {
                href: "/accounts",
                rel: "",
                type: "GET",
            },
            {
                href: "/auth",
                rel: "",
                type: "GET",
            },
            {
                href: "/register",
                rel: "",
                type: "POST",
            },
        ],
    });
});

// 404 Middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});



