import express from "express";
import cors from "cors";

import userRouter from "../Routes/userRoutes.js";
import contestRouter from "../Routes/JudgeRoutes/contestRoutes.js";
import { globalErrorrHandling } from "./Controllers/errorControllers/errorContollers.js";
import AppError from "../util/appError.js";
import morgan from "morgan";
import { userAuth } from "./MiddleWare/userAuthentication.js";
import mongosanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

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

app.use(cors());
app.use(express.static("../public"));

// user /api/v1/users before any route from userRouter
app.use("/api/v1/users", userRouter);
app.use("/api/v1/Judge", userAuth, contestRouter);

// For any (un) Hnadled route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 500));
});

// Global Error Handling response
app.use(globalErrorrHandling);

export default app;
