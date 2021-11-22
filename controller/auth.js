const express = require("express");

const router = express.Router();

router.get("/api/login", (req, res, next) => {
    res.send('<h1>Login</h1>');
})

module.exports = router;