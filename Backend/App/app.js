process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

import express from "express";
import cors from "cors";

import userRouter from "../Routes/userRoutes/userRoutes.js";
import contestRouter from "../Routes/JudgeRoutes/contestRoutes.js";
import polygonRouter from "../Routes/JudgeRoutes/ploygonRoutes.js";
import submissionRouter from "../Routes/JudgeRoutes/submissionRoutes.js";
import problemRouter from "../Routes/JudgeRoutes/problemRoutes.js"
import teamRouter from "../Routes/JudgeRoutes/teamRoutes.js"
import notificationRouter from '../Routes/userRoutes/notificationRoutes.js'
import chatRouter  from "../Routes/chatRoutes/chatRoutes.js"

import { globalErrorrHandling } from './Controllers/errorControllers/errorContollers.js'
import AppError from '../util/appError.js'
import morgan from 'morgan'
import { userAuth } from './MiddleWare/Authentication/userAuthentication.js'
import mongosanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { paginationMiddleware } from "./MiddleWare/helpers/helper.js";

dotenv.config({ path: './configuration/config.env' })
const app = express()

// MIDDLEWARES

// 1) GLOBALE MIDDLEWARES

// SET SECURITY HTTP HEADERS
app.use(helmet())

// TEST MIDDLEWARE
app.use((req, res, next) => {
    req.timeRequested = new Date().toISOString()
    console.log('Hello from Online Judge Middleware')
    next()
})

// Show the -> (Http method , route_url , status-code , token time of req )
app.use(morgan('dev'))

// to get data from req (req.body)
app.use(express.json({ limit: '10kB' }))

// Data sanitization against NoSQl Query injection ({"$gt":""} ->{"gt":""} )
app.use(mongosanitize())

// Data sanitization against Xss (convert tages to html entities )
app.use(xss())

// prevent parameter pollution
app.use(
    hpp({
        whitelist: ['userName', 'role', 'email'],
    })
)

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

// serving static files
app.use(express.static('../public'))

// HANDLE THE MAXIMUM NUMBER OF REQUESTS PER HOUR FROM THE SAME API
const limitter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 100,
    message: 'Too many request from this IP , please try again in an hour.',
})

// LIMITTER MIDDLEWARE
app.use('/api', limitter)

// use /api/v1/users before any route from userRouter

app.use("/api/v1/users", userRouter);

app.use("/api/v1/chat", userAuth, paginationMiddleware, chatRouter);
app.use('/api/v1/notifications', userAuth, paginationMiddleware, notificationRouter)
app.use("/api/v1/submissions", userAuth, paginationMiddleware, submissionRouter);


app.use("/api/v1/judge/teams", userAuth, paginationMiddleware , teamRouter)
// use /api/v1/judge + userAuth before any route from judge
app.use("/api/v1/judge", userAuth, paginationMiddleware, problemRouter, contestRouter, polygonRouter)


// For any (un) Hnadled route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 500));
});

// Global Error Handling response
app.use(globalErrorrHandling);

export default app;
