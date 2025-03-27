const { influxClient } = require("../config/database");

let org = `Ynov`;
let bucket = `metrics`;

let writeClient = influxClient.getWriteApi(org, bucket, "ns");

for (let i = 0; i < 5; i++) {
  let point = new Point("measurement1").tag("tagname1", "tagvalue1").intField("field1", i);

  void setTimeout(() => {
    writeClient.writePoint(point);
  }, i * 1000); // separate points by 1 second

  void setTimeout(() => {
    writeClient.flush();
  }, 5000);
}
