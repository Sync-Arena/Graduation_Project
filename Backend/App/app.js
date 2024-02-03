process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

import express from "express";
import cors from "cors";

import userRouter from "../Routes/userRoutes.js";
import contestRouter from "../Routes/JudgeRoutes/contestRoutes.js";
import polygonRouter from "../Routes/JudgeRoutes/ploygonRoutes.js";
import { globalErrorrHandling } from "./Controllers/errorControllers/errorContollers.js";
import AppError from "../util/appError.js";
import morgan from "morgan";
import { userAuth } from "./MiddleWare/Authentication/userAuthentication.js";
import mongosanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config({ path: "./configuration/config.env" });
const app = express();

// MIDDLEWARES

// 1) GLOBALE MIDDLEWARES

// SET SECURITY HTTP HEADERS
app.use(helmet());

// TEST MIDDLEWARE
app.use((req, res, next) => {
  req.timeRequested = new Date().toISOString();
  console.log("Hello from Online Judge Middleware");
  next();
});

// Show the -> (Http method , route_url , status-code , token time of req )
app.use(morgan("dev"));

// to get data from req (req.body)
app.use(express.json({ limit: "10kB" }));

// Data sanitization against NoSQl Query injection ({"$gt":""} ->{"gt":""} )
app.use(mongosanitize());

// Data sanitization against Xss (convert tages to html entities )
app.use(xss());

// prevent parameter pollution
app.use(
  hpp({
    whitelist: ["userName", "role", "email"],
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// serving static files
app.use(express.static("../public"));

// HANDLE THE MAXIMUM NUMBER OF REQUESTS PER HOUR FROM THE SAME API
const limitter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 100,
  message: "Too many request from this IP , please try again in an hour.",
});

// LIMITTER MIDDLEWARE
app.use("/api", limitter);

// user /api/v1/users before any route from userRouter
app.use("/api/v1/users", userRouter);
app.use("/api/v1/judge", userAuth, contestRouter, polygonRouter);

// For any (un) Hnadled route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 500));
});

// Global Error Handling response
app.use(globalErrorrHandling);

export default app;
