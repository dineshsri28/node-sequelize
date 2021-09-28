const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("shop", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then((e) => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error", err));

sequelize.sync();

module.exports = sequelize;
