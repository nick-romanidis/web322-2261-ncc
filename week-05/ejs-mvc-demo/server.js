const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

// Set up EJS
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, "public")));

// Set up controllers
const generalController = require("./controllers/generalController");
const employeeController = require("./controllers/employeeController");

app.use("/", generalController);
app.use("/employee", employeeController);

// Start listening
const HTTP_PORT = process.env.PORT || 8080;

app.listen(HTTP_PORT, () => {
    console.log(`server listening on: ${HTTP_PORT}`);
});