const { influxClient } = require("../config/database");
const { Point } = require("@influxdata/influxdb-client");
const { Device } = require("../psql/models/device");

exports.writeToInflux = async (req, res) => {
  let org = `Ynov`;
  let bucket = `metrics`;

  let writeClient = influxClient.getWriteApi(org, bucket, "ns");

  const { deviceid, temp, timestamp } = req.body;

  const deviceInfo = await Device.findOne({ where: { id: deviceid } });

  let point = new Point("data").tag("location", deviceInfo.location).tag("type", deviceInfo.type).intFloat("temp", temp).timestamp(timestamp);
  console.log("New point created");

  writeClient.writePoint(point);

  writeApi.close().then(() => {
    console.log("WRITE FINISHED");
  });

  res.status(201);
};

exports.queryAll = async (req, res) => {
  let org = `Ynov`;
  let queryClient = influxClient.getQueryApi(org);
  let fluxQuery = `from(bucket: "metrics")
 |> range(start: -10m)
 |> filter(fn: (r) => r._measurement == "data")`;

  let results = [];

  queryClient.queryRows(fluxQuery, {
    next: (row, tableMeta) => {
      const tableObject = tableMeta.toObject(row);
      results.push(tableObject);
      console.log(tableObject);
    },
    error: (error) => {
      console.error("\nError", error);
    },
    complete: () => {
      console.log("\nSuccess");
      res.status(200).json(results);
    },
  });
};
