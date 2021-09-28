const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

let user = sequelize.define("user", {
  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  phoneNumber: {
    unique: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

module.exports = user;
