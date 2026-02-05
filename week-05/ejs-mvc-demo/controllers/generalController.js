const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("general/home", {
        title: "Home"
    });
});

router.get('/about', (req, res) => {
    res.render("general/about", {
        title: "About"
    });
});

module.exports = router;