const express = require("express");
const app = express();

const deviceRoutes = require("./routes/deviceRoutes");
const { apiconfig } = require("./config/config.js");

const port = 3000;

/*
  TODO :
  - setup influxDB et postGreSQL
  - créer des endpoints pour Grafana
  - voir comment récuperer des infos depuis la Raspberry Pi
*/

// Middleware to parse JSON requests
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,HEAD,OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  // res.setHeaders("Accept", "*/*");
  res.header("Cache-Control", "no-cache");
  next();
});

app.use("/device", deviceRoutes);

app.get("/", (req, res) => {
  res.send("Server Online");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
