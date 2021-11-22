const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Card = require("./card");

const Lane = sequelize.define("lane", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING
});

Lane.hasMany(Card);

module.exports = Lane;
