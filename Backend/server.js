import "./DataBase/connection.js";
import app from "./app.js";

// listen to the server
app.listen(process.env.PORT, () => console.log(process.env.APP_URL));
