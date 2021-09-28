let express = require("express");
let bodyParser = require("body-parser");

let productRoutes = require("./routes/product");
let userRoutes = require("./routes/user");

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use("/product", productRoutes);
app.use("/user", userRoutes);

app.use("*", (req, res) => {
  res.send("404");
});

app.listen(3000, (res, err) => {
  if (err) return console.log("error", err);
  console.log("Server is listening on port 3000");
});
