const express = require("express");
const serverless = require('serverless-http');
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

const adminRoutes = require("./controller/admin");
const errorRoutes = require("./controller/error");
const kanbanRoutes = require("./controller/kanban");
const mainRoutes = require("./controller/main");

var corsOptions = {
    origin: "http://localhost:8081",
};

app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(adminRoutes);
app.use(kanbanRoutes);
app.use(mainRoutes);
app.use(errorRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports.handler = serverless(app);