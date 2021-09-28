const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

let image = sequelize.define("image", {
  url: { required: true, type: DataTypes.STRING },
});


module.exports = image;