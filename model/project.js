const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Lane = require("./lane");

const Project = sequelize.define("project", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING
});

Project.hasMany(Lane);

module.exports = Project;
