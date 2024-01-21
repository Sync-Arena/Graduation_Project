const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// to make apis start to be used and connected to frontend
app.use(cors());

// set all folders in (public) to be static just begin with /
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: true }));

// to enable postman take json data
app.use(express.json());

// user all book routes (must begin with '/books' after app_url)
const userRouter = require("./routes/user.routes");
app.use("/users", userRouter);

module.exports = app;
