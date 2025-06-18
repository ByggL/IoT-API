/* const configs = {
  development: {
    username: "postgres",
    password: "password",
    database: "postgres",
    host: "localhost",
    port: 3001,
  },
  test: {
    username: "bbot",
    password: "ER79jtZb59Zet2",
    database: "licenses_extension_db",
    host: "localhost",
    port: 8001,
  },
  production: {
    username: "bbot",
    password: "ER79jtZb59Zet2",
    database: "licenses_extension_db",
    host: "localhost",
    port: 8001,
  },
}; */

const config = {
  username: "postgres",
  password: "password",
  database: "iot_db",
  host: "localhost",
  port: 80,
};

const apiconfig = config;

module.exports = {
  apiconfig,
};
