const express = require("express");
const userModel = require("../models/userModel");

const router = express.Router();

// Route to the registration page
router.get("/register", (req, res) => {
    res.render("users/register")
});

router.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // TODO: Validate the information entered is correct.

    // TODO: ON the assignment, first check if the email already exists in the database.
    // WARNING: Do not throw/show any error if a duplicate email exists and attempt to
    //          add it without checking first.  Show a friendly error message.

    /// Add the new user to the database
    const newUser = new userModel({
        firstName, lastName, email, password
    });

    newUser.save()
        .then(user => {
            console.log(`User ${user.firstName} has been added to the collection.`);
            res.redirect("/");
        })
        .catch(err => {
            console.log(`Error adding user to the collection... ${err}`);
            res.render("users/register");
        });
});

module.exports = router;