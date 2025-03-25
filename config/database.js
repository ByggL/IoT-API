const Sequelize = require("sequelize");
const { apiconfig } = require("./config.js");
// const PostGresDialect = require("@Sequelize/postgres");

// const instance = config.development; // CHANGE TO DESIRED INSTANCE
// à ne définir qu'une fois (et pas à la fois dans server.js et ici)

module.exports = new Sequelize({
  database: apiconfig.database,
  user: apiconfig.username,
  password: apiconfig.password,
  host: apiconfig.host,
  dialect: apiconfig.dialect,
  quoteIdentifiers: false,
  port: 5432,
  ssl: true,
  clientMinMessages: "notice",
});
