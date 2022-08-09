const express = require("express");
require("dotenv").config();
const api = require("./controller");
const app = express();
const sequelize = require("./config/sequelize");

app.use(express.json());

app.use("/api", api);

const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
  });
});
