let express = require("express");
const { Op } = require("sequelize");
let app = express();
let product = require("../model/product");
let image = require("../model/image");

app.get("/", async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const search = req.query.search || "";
  const offset = (page - 1) * limit;
  product
    .findAndCountAll({
      attributes:["id","title", "description", "price"],
      limit: limit || null,
      offset: offset || null,
      include:{
        model: image,
        attributes:["url"]
      }
    })
    .then((result) => {
      res.json({
        data: result && result.rows,
        total: result && result.count,
      });
    })
    .catch((err) => {
      res.status(err.status || 500);
      res.json({
        error: {
          message: err.message,
        },
      });
    });
});

app.get("/search", async (req, res) => {
  const search = req.query.search || "";
  product
    .findAll({
      attributes:["title"],
      where:{
        title:{
          [Op.like] : search || null
        }
      }
    })
    .then((result) => {
      res.json({
        result
      });
    })
    .catch((err) => {
      res.status(err.status || 500);
      res.json({
        error: {
          message: err.message,
        },
      });
    });
});

app.post("/", (req, res) => {
  product
    .create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    })
    .then((data) => {
      image.create({url: req.body.url, productId: data.id})
      image.create({url: req.body.url1, productId: data.id})
      res.json(data).send(200)
    })
    .catch((err) => {
      res.status(err.status || 500);
      res.json({
        error: {
          message: err.message,
        },
      });
    });
});

app.patch("/:id", (req, res) => {
  let { id } = req.params;
  if(!id) return res.json("id required")
  product
    .update(
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
      },
      {
        where: {
          id: id,
        },
      }
    )
    .then((data) => res.json({message:data}))
    .catch((err) => {
      res.status(err.status || 500);
      res.json({
        error: {
          message: err.message,
        },
      });
    });
});

app.delete("/:id", (req, res) => {
  let { id } = req.params;
  if (id) {
    product
      .destroy({
        where: {
          id: id,
        },
      })
      .then((result) => res.json("success"))
      .catch((err) => {
        res.status(err.status || 500);
        res.json({
          error: {
            message: err.message,
          },
        });
      });
  } else {
    res.json({ message: "id field is required" });
  }
});

module.exports = app;
