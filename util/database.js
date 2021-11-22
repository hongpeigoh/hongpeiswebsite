const Sequelize = require("sequelize");

const sequelize = new Sequelize("reactkanbandb", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
