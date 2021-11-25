const express = require("express");

const router = express.Router();

const User = require("../model/user");

router.get("/api/login", (req, res, next) => {
  res.send("<h1>Login</h1>");
});

router.get("/api/register", (req, res, next) => {
  res.send("<h1>Register</h1>");
});

router.post("/api/register", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const isAdmin = false;
  const projects = [];
  const user = new User({
    username: username,
    password: password,
    isAdmin: isAdmin,
    projects: projects,
  });
  user
    .save()
    .then((result) => {
      const message = "User registered successfully!";
      console.log(message);
      res.json({ message: message });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error: error });
    });
});

module.exports = router;
