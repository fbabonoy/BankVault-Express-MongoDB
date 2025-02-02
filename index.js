const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();
// const bodyParser = require("body-parser");
// const path = require("path");

const auth = require("./routes/auth");
const register = require("./routes/register")
const users = require("./routes/users");
const transfers = require("./routes/transactions");

const error = require("./utilities/error.mjs");



const app = express();
const port = 8085;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ extended: true }));

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connected to mongodb")
    })
    .catch((e)=>{
        console.log(e);
    })

app.use(express.json())


apiKeys = ["admin"];

app.use("/accounts", function (req, res, next) {
    var key = req.query["api-key"];


    if (!key) next(error(400, "API Key Required"));
    if (apiKeys.indexOf(key) === -1) next(error(401, "Invalid API Key"));

    req.key = key;
    next();
});

app.use("/auth", auth);
app.use("/register", register);
app.use("/accounts", users);
// app.use("/transactions", transfers);

app.get("/", (req, res) => {
    res.json({
        links: [
            {
                href: "/accounts",
                rel: "",
                type: "GET",
            },
            {
                href: "/transactions",
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



