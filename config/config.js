const configs = {
  development: {
    username: "root",
    password: "password",
    database: "licenses_extension_db",
    host: "localhost",
    dialect: "postgres",
    port: 3001,
  },
  test: {
    username: "bbot",
    password: "ER79jtZb59Zet2",
    database: "licenses_extension_db",
    host: "localhost",
    dialect: "postgres",
    port: 8001,
  },
  production: {
    username: "bbot",
    password: "ER79jtZb59Zet2",
    database: "licenses_extension_db",
    host: "localhost",
    dialect: "postgres",
    port: 8001,
  },
};

const apiconfig = configs.development;

const test_file = "C:/Users/SamuelLEOBON/OneDrive - BWORKSHOP/Documents/netsuite-esker testing/test.js";

module.exports = {
  apiconfig,
  test_file,
};
