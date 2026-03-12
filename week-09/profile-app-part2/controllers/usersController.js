const express = require("express");
const bcryptjs = require("bcryptjs");
const path = require("path");

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

            // Create a unique name for the picture file, so that it can ge stored
            // locally without overwriting any other file.
            const profilePicFile = req.files.profilePic;
            const profilePicName = path.parse(profilePicFile.name);
            const uniqueName = `profile-pic-${user._id}${profilePicName.ext}`;

            // Copy the image data to a file on the file system.
            profilePicFile.mv(`public/profile-pics/${uniqueName}`)
                .then(() => {
                    userModel.updateOne({
                        _id: user._id
                    }, {
                        profilePic: uniqueName
                    })
                        .then(() => {
                            console.log("Updated the user document.");
                            res.redirect("/");
                        })
                        .catch(err => {
                            console.log("Couldn't update the user document. " + err);
                            res.redirect("/");
                        });
                })
                .catch(err => {
                    console.log("Couldn't upload the image. " + err);
                    res.redirect("/");
                })
        })
        .catch(err => {
            console.log(`Error adding user to the collection... ${err}`);
            res.render("users/register");
        });
});

// Set up login routes
router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // TODO: Validate that both the email and password have 
    // been provided.

    let errors = [];

    userModel.findOne({
        email
    })
        .then(user => {
            // Completed the search (successfully).

            if (user) {
                // Found the user document.
                // Compare the passwords.
                bcryptjs.compare(password, user.password)
                    .then(matched => {
                        if (matched) {
                            // User typed the correct password.
                            req.session.user = user;

                            console.log("User signed in.");
                            res.redirect("/");
                        }
                        else {
                            // User typed in the incorrect password.
                            console.log("Password didn't match");
                            errors.push("Email or password was wrong.");
                            res.render("users/login", {
                                errors
                            });
                        }
                    })
                    .catch(err => {
                        errors.push("There was a problem");

                        console.log("Unable to compare passwords: " + err);

                        res.render("users/login", {
                            errors
                        });
                    });
            }
            else {
                // user document was not found.
                errors.push("Email and password combination not found.");
                console.log(errors[0]);
                res.render("users/login", {
                    errors
                });
            }
        })
        .catch(err => {
            // Not able to query the database.
            errors.push("There was a problem");

            console.log("Unable to query the database: " + err);

            res.render("users/login", {
                errors
            });
        });
});

router.get("/logout", (req, res) => {
    // Clear the session from memory.
    req.session.destroy();

    // DO NOT DO THIS!
    //req.session.user = null;

    res.redirect("/users/login");
});

module.exports = router;