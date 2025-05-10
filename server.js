const express = require("express");
const app = express();

const deviceRoutes = require("./psql/routes/deviceRoutes.js");
const { apiconfig } = require("./config/config.js");
const { psdb } = require("./config/database"); // db is the Sequelize instance created in database.js
const influxRoutes = require("./influx/routes.js");

const port = 3001;

/*
  TODO :
  - setup influxDB (API KEY : xMPlUtcoxCwSCzzXBpVGV97l6f9wZpxRjOw9udP-BJfMeTjOYSwRGY6yaS04wZ9ZQzO40KyXAy8QZGdrW0k52g==)
  - créer des endpoints pour Grafana
  - voir comment récuperer des infos depuis la Raspberry Pi
*/

// Connect to the postGreSQL database
psdb
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to database:", err));

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
app.use("/influx", influxRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server Online" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
