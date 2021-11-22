const express = require("express");

const router = express.Router();

router.get("/api/admin", (req, res, next) => {
    res.send('<h1>Admin</h1>');
})

module.exports = router;