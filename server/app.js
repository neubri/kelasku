if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res, next) => {
  res.status(200).json({ message: "Hello World" });
});

app.use("/", require("./routes"));

module.exports = app;
