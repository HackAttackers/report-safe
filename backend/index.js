const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();

app.arguments(express.json());
app.arguments(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started at port " + port);
});
