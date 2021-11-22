const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Project = require("./project");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

User.hasMany(Project);

module.exports = User;
