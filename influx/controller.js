const { influxClient } = require("../config/database");
const { Point } = require("@influxdata/influxdb-client");
const { hostname } = require("node:os");

async function testWriteInflux() {
  let org = `Ynov`;
  let bucket = `metrics`;

  let writeApi = influxClient.getWriteApi(org, bucket, "ns");
  writeApi.useDefaultTags({ location: hostname() });

  // write point with the current (client-side) timestamp
  const point1 = new Point("temperature").tag("example", "write.ts").floatField("value", 20 + Math.round(100 * Math.random()) / 10);
  writeApi.writePoint(point1);
  console.log(` ${point1}`);
  // write point with a custom timestamp
  const point2 = new Point("temperature")
    .tag("example", "write.ts")
    .floatField("value", 10 + Math.round(100 * Math.random()) / 10)
    .timestamp(new Date()); // can be also a number, but in writeApi's precision units (s, ms, us, ns)!
  writeApi.writePoint(point2);
  console.log(` ${point2.toLineProtocol(writeApi)}`);

  try {
    await writeApi.close();
    console.log("FINISHED ...");
  } catch (e) {
    console.error(e);
    console.log("\nFinished ERROR");
  }
}

function testQueryInflux() {
  let org = `Ynov`;
  let queryClient = influxClient.getQueryApi(org);
  let fluxQuery = `from(bucket: "metrics")
 |> range(start: -10m)
 |> filter(fn: (r) => r._measurement == "measurement1")`;

  queryClient.queryRows(fluxQuery, {
    next: (row, tableMeta) => {
      const tableObject = tableMeta.toObject(row);
      console.log(tableObject);
    },
    error: (error) => {
      console.error("\nError", error);
    },
    complete: () => {
      console.log("\nSuccess");
    },
  });
}

module.exports = { testWriteInflux, testQueryInflux };
