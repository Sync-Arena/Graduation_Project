import express from "express";
import cors from "cors";

import userRouter from "../Routes/userRoutes.js";
import { globalErrorrHandling } from "./Controllers/errorContollers.js";
import AppError from "../util/appError.js";
import morgan from "morgan";

const app = express();

// MIDDLEWARES
app.use((req, res, next) => {
  console.log("Hello from Online Judge Middleware");
  next();
});

// Show the -> (Http method , route_url , status-code , token time of req )
app.use(morgan("dev"));

// to get data from req (req.body)
app.use(express.json());

app.use(cors());
app.use(express.static("../public"));

// user /api/v1/users before any route from userRouter
app.use("/api/v1/users", userRouter);

// For any (un) Hnadled route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 500));
});

// Global Error Handling response
app.use(globalErrorrHandling);

export default app;
