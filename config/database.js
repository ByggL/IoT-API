// repl.repl.ignoreUndefined = true;

const INFLUXDB_TOKEN = "uyVICQOLPzfcjQSWPZmeYlWenK4OsdxRVEKh69uD2ggnqglGOuVSrzFY5Jm-KTmHw38tpvX1ePm67kWQULT-Pg==";

const Sequelize = require("sequelize");
const { apiconfig } = require("./config.js");
const { InfluxDB, Point } = require("@influxdata/influxdb-client");

const url = "http://localhost:8086";

const psdb = new Sequelize(`postgres://postgres:password@localhost:5432/postgres`, { dialect: "postgres" });
const influxClient = new InfluxDB({ url, INFLUXDB_TOKEN });

module.exports = {
  psdb,
  influxClient,
};
