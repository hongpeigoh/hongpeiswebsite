const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

const sequelize = require("./util/database");

//temporarily import models
const User = require('./model/user');
const Project = require('./model/project');
const Lane = require('./model/lane');
const Card = require('./model/card');

const adminRoutes = require("./controller/admin");
const authRoutes = require("./controller/auth");
const errorRoutes = require("./controller/error");
const kanbanRoutes = require("./controller/kanban");
const mainRoutes = require("./controller/main");

var corsOptions = {
  origin: "*",
};

// app.use(
//     helmet.contentSecurityPolicy({
//         directives:{
//             defaultSrc:["self"],
//             scriptSrc:["self","code.jquery.com","maxcdn.bootstrapcdn.com","https://ajax.googleapis.com"],
//             styleSrc:["self","maxcdn.bootstrapcdn.com"],
//             fontSrc:["self","maxcdn.bootstrapcdn.com"]
//         }
//     })
// );
app.use(compression());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "frontend/build")));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(adminRoutes);
app.use(authRoutes);
app.use(kanbanRoutes);
app.use(mainRoutes);
app.use(errorRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(error);
  });