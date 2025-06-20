const { influxClient } = require("../config/database");
const { Point } = require("@influxdata/influxdb-client");
const Device = require("../psql/models/device");

require("dotenv").config();

const tokens = {
  influx: process.env.INFLUX_TOKEN,
};

const tokenIsInvalid = (tokenBearingRequest) => {
  /* if (tokenBearingRequest.headers.authorization == null) return true;
  else if (tokenBearingRequest.headers.authorization.replace("Bearer ", "") !== tokens.devices) return true;
  else return false; */
  return false;
};

exports.writeToInflux = async (req, res) => {
  if (tokenIsInvalid(req)) {
    res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
    return;
  }

  let org = `Ynov`;
  let bucket = `metrics`;

  let writeClient = influxClient.getWriteApi(org, bucket, "ns");

  console.log(req.body);

  if (!req.body) {
    res.status(400).json({ error: "Body is undefined" });
    return;
  }

  const { deviceid, temperature, humidity, timestampValue } = req.body;

  if (!temperature || !humidity) {
    res.status(400).json({ error: "Some values are null" });
    return;
  }

  const deviceInfo = await Device.findOne({ where: { id: deviceid } });

  let point = new Point("data")
    .tag("deviceid", deviceid)
    .tag("location", deviceInfo.location.trim().replace(/\s/g, ""))
    .tag("type", deviceInfo.measuretype)
    .floatField("temperature", temperature)
    .floatField("humidity", humidity)
    .timestamp(new Date(timestampValue));
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
  if (tokenIsInvalid(req)) {
    res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
    return;
  }

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
      res.status(500).json({ error: "500 Internal Server Error" });
    },
    complete: () => {
      console.log("\nSuccess");
      res.status(200).json(results);
    },
  });
};
