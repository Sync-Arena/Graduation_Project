import express from "express";
import cors from "cors";
const app = express();

// to make apis start to be used and connected to frontend
app.use(cors());

// set all folders in (public) to be static just begin with /
app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

// to enable postman take json data
app.use(express.json());

// user all book routes (must begin with '/books' after app_url)
import userRouter from "./routes/userRoutes.js";
app.use("/users", userRouter);

export default app;
