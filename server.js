const express = require("express");
const app = express();
const port = 3000;

/*
  TODO :
  - setup influxDB et postGreSQL
  - créer des endpoints pour Grafana
  - voir comment récuperer des infos depuis la Raspberry Pi
*/

app.get("/", (req, res) => {
  res.send("Server Online");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
