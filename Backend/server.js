require("./DataBase/connection");

const app = require("./app");

//listen to the server
app.listen(process.env.PORT, () => console.log(process.env.APP_URL));
