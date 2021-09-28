const express = require("express");
const app = express();
const user = require("../model/user");

app.get("/", (req, res) => {
  user
    .findAll({include:{all: true}})
    .then((result) => res.json(result))
    .catch((err) => {
      res.status(err.status || 500);
      res.json({
        error: {
          message: err.message,
        },
      });
    });
});

module.exports = app;
