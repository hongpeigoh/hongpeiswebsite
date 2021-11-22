const express = require("express");
const path = require("path");

const router = express.Router();

if (process.env.NODE_ENV === "production") {

  router.use(express.static(path.join(__dirname, "frontend/build")));

  router.get("*", (req, res, next) => {
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
  });
}

module.exports = router;
