// repl.repl.ignoreUndefined = true;

const INFLUXDB_TOKEN = "6ipIQckYfqul5X4ZnEFKb_iH3EMwP5_mYWXzRTEccNGmRcnEFFj6UG8ObvyqqtHEyAxteh6AeGpFPm9R8tWy8Q==";

const Sequelize = require("sequelize");
const { apiconfig } = require("./config.js");
const { InfluxDB } = require("@influxdata/influxdb-client");

const url = "http://localhost:8086";

const psdb = new Sequelize(`postgres://postgres:password@localhost:5432/postgres`, { dialect: "postgres" });
const influxClient = new InfluxDB({ url, INFLUXDB_TOKEN });

module.exports = {
  psdb,
  influxClient,
};
