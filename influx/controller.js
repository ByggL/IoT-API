const { influxClient } = require("../config/database");
const { Point } = require("@influxdata/influxdb-client");
const Device = require("../psql/models/device");

exports.writeToInflux = async (req, res) => {
  let org = `Ynov`;
  let bucket = `metrics`;

  let writeClient = influxClient.getWriteApi(org, bucket, "ns");

  const { deviceid, temp, hum, timestamp } = req.body;

  const deviceInfo = await Device.findOne({ where: { id: deviceid } });

  let point = new Point("data")
    .tag("deviceid", deviceid)
    .tag("location", deviceInfo.location.trim().replace(/\s/g, ""))
    .tag("type", deviceInfo.measuretype)
    .floatField("temp", temp)
    .floatField("hum", hum)
    .timestamp(new Date(timestamp));
  console.log("New point created");

  writeClient.writePoint(point);

  try {
    await writeClient.close();
    console.log("FINISHED");
    res.status(201).json({ point: point.toString() });
  } catch (e) {
    console.error(e);
    console.log("\nFinished ERROR");
    res.status(400).json({ faultyPoint: point.toString() });
  }
};

exports.queryAll = async (req, res) => {
  let org = `Ynov`;
  let queryClient = influxClient.getQueryApi(org);
  let fluxQuery = `from(bucket: "metrics")
 |> range(start: -12h)
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
