const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        "type": String,
        "required": true
    },
    lastName: {
        "type": String,
        "required": true
    },
    email: {
        "type": String,
        "required": true,
        "unique": true
    },
    password: {
        "type": String,
        "required": true
    },
    profilePic: String,
    dateCreated: {
        "type": Date,
        "default": Date.now
    }
});

// Hash passwords when a new user is added.
userSchema.pre("save", async function() {
    // 'this' refers to the user document/model
    const user = this;

    if (!user.isModified('password')) {
        // Password hasn't changed, do not hash an already hased password.
        return; 
    }

    try {
        // The new mongoose detected the promise in our logic and didn't pass
        // in the next function. Instead, using await seems to do the trick.

        // Generate the salt.
        const salt = await bcryptjs.genSalt(10);
        
        // Set the password to the hashed version
        user.password = await bcryptjs.hash(user.password, salt);
    } 
    catch (err) {
        // If you throw an error, Mongoose catches it and sends it to the .save().catch().
        throw new Error(`Hashing failed: ${err.message}`);
    }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;