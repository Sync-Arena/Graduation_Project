import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./configuration/config.env" });


const db = process.env.DATABASE_HOST_LINK.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((_) => {
    console.log("Connected to the database successfully");
  });


