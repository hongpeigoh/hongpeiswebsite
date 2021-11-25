const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();

// API Routes
const adminRoutes = require("./controller/admin");
const authRoutes = require("./controller/auth");
const errorRoutes = require("./controller/error");
const kanbanRoutes = require("./controller/kanban");
const mainRoutes = require("./controller/main");

// Compression middleware
app.use(compression());

// CORS
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// // Helmet for app security
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

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use(adminRoutes);
app.use(authRoutes);
app.use(kanbanRoutes);
app.use(mainRoutes);
app.use(errorRoutes);

const PORT = process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
