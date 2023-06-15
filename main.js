const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require('body-parser')
const routes = require("./routes/index");
const authRoutes = require("./routes/auth")

const ConnectDB = require("./database/db")

app.use(routes);
app.use(authRoutes); 
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

ConnectDB().then(()=> {       // First connect DB then run server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})
