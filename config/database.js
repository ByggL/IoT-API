// repl.repl.ignoreUndefined = true;
const { InfluxDB } = require("@influxdata/influxdb-client");

const INFLUXDB_TOKEN = "N8H_XcFUhsEnrbCTPgfWbyKTNrp6pdDOddPF1ShJglnroZSqtqeZn1BhFDgsvRwo5Ft6iUliYgxvQjK2f2KhJw==";

const Sequelize = require("sequelize");
const { apiconfig } = require("./config.js");

const url = "http://localhost:8086";

const psdb = new Sequelize(
  `postgres://${apiconfig.username}:${apiconfig.password}@localhost:5432/${apiconfig.database}`,
  { dialect: "postgres" }
);
const influxClient = new InfluxDB({ url: url, token: INFLUXDB_TOKEN });

module.exports = {
  psdb,
  influxClient,
};
