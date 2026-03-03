const path = require("path");
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const sequelizeModule = require("sequelize");

const app = express();

// Set up EJS
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(expressLayouts);

// Set up body-parser.
app.use(express.urlencoded({ extended: true }));

// Define the connection to our Postgres instance.
const sequelize = new sequelizeModule("database_name", "user_name", "password", {
    host: "host_url",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    }
});

const nameModel = sequelize.define("Name", {
    fName: sequelizeModule.STRING,
    lName: sequelizeModule.STRING
});

app.get("/", (req, res) => {
    nameModel.findAll({
        order: ["fName", "lName"]
    }).then(data => {
        const names = data.map(value => value.dataValues);

        res.render("nameTable", {
            names
        });
    }).catch(() => {
        res.render("nameTable", {
            names: []
        });
    });
});

app.post("/addName", (req, res) => {
    const { fName, lName } = req.body;

    // Create a record using the "name" model.
    nameModel.create({
        fName,
        lName
    }).then(() => {
        console.log("Successfully created a new name record.");
        res.redirect("/");
    }).catch(err => {
        console.log("Failed to create a new name record. " + err);
        res.redirect("/");
    });
});

app.post("/updateName", (req, res) => {
    const { id, fName, lName } = req.body;

    if (fName.length === 0 && lName.length === 0) {
        // Delete the record from the database.

        nameModel.destroy(
            { where: { id } }
        ).then(() => {
            console.log("Successfully deleted a name record.");
            res.redirect("/");
        }).catch(err => {
            console.log("Failed to deleted a name record. " + err);
            res.redirect("/");
        });
    }
    else {
        // Update the record in the database.

        nameModel.update(
            { fName, lName },
            { where: { id } }
        ).then(() => {
            console.log("Successfully updated a name record.");
            res.redirect("/");
        }).catch(err => {
            console.log("Failed to update a name record. " + err);
            res.redirect("/");
        });

    }

});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

sequelize.sync()
    .then(() => {
        app.listen(HTTP_PORT, onHttpStart);
    })
    .catch(err => {
        console.log(err);
    });
