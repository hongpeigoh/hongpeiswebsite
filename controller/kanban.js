const express = require("express");

const router = express.Router();

router.get("/api/kanban", (req, res, next) => {
    res.send('<h1>Kanban</h1>');
})

module.exports = router;