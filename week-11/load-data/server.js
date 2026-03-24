const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

// Set up express.
const app = express();

// Set up Mongoose Schema
const nameSchema = new mongoose.Schema({
    nickname: {
        type: String,
        unique: true
    },
    fName: String,
    lName: String,
    age: {
        type: Number,
        default: 25
    }
});

// Set up Mongoose Model.
const nameModel = mongoose.model("names", nameSchema);

// Fake database.
const namesToAdd = [
    { nickname: "Nick", fName: "Nicholas", lName: "Romanidis", age: 44 },
    { nickname: "Jane", fName: "Jane", lName: "Doe", age: 30 },
    { nickname: "John", fName: "Johnny", lName: "Smith", age: 35 }
];

// Add a route to copy the data from the fake database to MongoDB.
// Remember: In the assignment, creating a controller called "load-data",
// "load-data" should be the prefix, and the route url will be the entity name
// for example: "mealkits".
app.get("/load-data/names", (req, res) => {
    // Protect this route!
    // In the assignment, only "data clerks" can access it.

    // if (req.session && req.session.user && req.session.isClerk) {
    //     // Clerk the signed in.
    //     // We can proceed, and load the data.   
    // }
    // else {
    //     // No one is signed in, or a customer is signed in.
    //     // Show the error page.
    //     req.status(401).render("error", { message: "You are not authorized." });
    // }

    // For the assignment, the mealkits are in a module.
    // 1) Require the module at the top.
    // 2) Grab all mealkits and pass to insertMany:
    //    eg.  mealkitModel.insertMany(mealkitUtil.getAllMealkits())
    nameModel.countDocuments()
        .then(count => {
            if (count === 0) {
                // There are no documents. Proceed to load the data.
                nameModel.insertMany(namesToAdd)
                    .then(() => {
                        //res.render("error", { message: "Success, data was loaded!" });
                        res.send("Success, data was loaded!");
                    })
                    .catch(err => {
                        //res.render("error", { message: err });
                        res.send("Error: " + err);
                    });
            }
            else {
                //res.render("error", { message: "Already loaded" });
                res.send("Already loaded");
            }
        })
        .catch(err => {
            //res.render("error", { message: err });
            res.send("Error: " + err);
        });
});

app.get("/", (req, res) => {
    res.send("Ready to go...");
})


// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
// Connect to the MongoDB
mongoose.connect("connection_string").then(() => {
    console.log("Connected to the MongoDB");
    app.listen(HTTP_PORT, onHttpStart);
});