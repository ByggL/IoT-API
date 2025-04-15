// repl.repl.ignoreUndefined = true;
const { InfluxDB } = require("@influxdata/influxdb-client");

const INFLUXDB_TOKEN = "VCYRBvg8HUa0okTnXKzXHC0c6WOTCvHipRvPgCC6rgGDKuKVuGcL90sYZXTJ78Vb8pv6E19eXjNgfEyIj-dt3g==";

const Sequelize = require("sequelize");
const { apiconfig } = require("./config.js");

const url = "http://localhost:8086";

const psdb = new Sequelize(`postgres://postgres:password@localhost:5432/postgres`, { dialect: "postgres" });
const influxClient = new InfluxDB({ url: url, token: INFLUXDB_TOKEN });

module.exports = {
  psdb,
  influxClient,
};
