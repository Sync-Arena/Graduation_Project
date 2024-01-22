import dotenv from "dotenv"
dotenv.config();

import mongoose from "mongoose";

const db = process.env.DB_URL_HOSTED.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => console.log("Connected to Database Successfully"));
