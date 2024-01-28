import "./Database/connection.js";
import app from "./App/app.js";

app.listen(process.env.PORT, () =>
  console.log(`http://127.0.0.1:${process.env.PORT}`)
);
