const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const image = require("./image");

let product = sequelize.define("product", {
  title: { required: true, type: DataTypes.STRING },
  description: { required: true, type: DataTypes.STRING },
  price: { required: true, type: DataTypes.FLOAT },
});

product.hasMany(image)

module.exports = product;
