const Device = require("../models/device");

const datetimeformat = (date) => {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  let returnstring = [date.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("");
  returnstring = returnstring + " " + date.getHours() + ":" + date.getMinutes() + ":00";
  return returnstring;
};

const tokenIsInvalid = (tokenBearingRequest) => {
  return tokenBearingRequest.headers.authorization.replace("Bearer ", "") !== tokens.devices || tokenBearingRequest.headers.authorization == null;
};

exports.getAllDevices = async (req, res) => {
  // if (tokenIsInvalid(req)) {
  //   res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
  //   return;
  // }

  try {
    const devices = await Device.findAll();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: "500 Internal Server Error" });
    console.log(error);
  }
};

exports.createDevice = async (req, res) => {
  // if (tokenIsInvalid(req)) {
  //   res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
  //   return;
  // }

  const { id, name, type, measuretype, location } = req.body;

  const createdAt = new Date();
  const updatedAt = new Date();

  // const id = (await Device.max("id")) + 1 || 1;

  try {
    const newDevice = await Device.create({
      id: id,
      name: name,
      type: type,
      measuretype: measuretype,
      location: location,
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(500).json({ error: "500 Internal Server Error" });
    console.log(error);
  }
};

// Controller method to get a device by name
exports.getDeviceByName = async (req, res) => {
  // if (tokenIsInvalid(req)) {
  //   res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
  //   return;
  // }

  const reqname = req.params.name;

  try {
    const device = await Device.findOne({ where: { name: reqname } });
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ error: "404 Not Found : Device not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "500 Internal Server Error" });
    console.log(error);
  }
};

// Controller method to get a device by ID
exports.getDeviceByID = async (req, res) => {
  // if (tokenIsInvalid(req)) {
  //   res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
  //   return;
  // }

  const reqid = req.params.id;

  try {
    const device = await Device.findOne({ where: { id: reqid } });
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ error: "404 Not Found : Device not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "500 Internal Server Error" });
    console.log(error);
  }
};

// Controller method to update a device status by its name
exports.updateDevice = async (req, res) => {
  // if (tokenIsInvalid(req)) {
  //   res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
  //   return;
  // }

  const reqname = req.params.name;
  const { name, type, measuretype, location } = req.body;
  console.log(JSON.stringify(req.body, null, 4));

  try {
    const device = await Device.findOne({ where: { name: reqname } });
    if (device) {
      device.name = name;
      device.type = type;
      device.measuretype = measuretype;
      device.location = location;
      device.updatedAt = new Date();
      await device.save();
      res.json(device);
    } else {
      res.status(404).json({ error: "404 Not Found : Device not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "500 Internal Server Error" });
    console.log(error);
  }
};

// Controller method to delete a device by its name
exports.deleteDevice = async (req, res) => {
  // if (tokenIsInvalid(req)) {
  //   res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
  //   return;
  // }

  const reqname = req.params.name;

  try {
    const device = await Device.findOne({ where: { name: reqname } });
    if (device) {
      await device.destroy();
      res.json(device);
    } else {
      res.status(404).json({ error: "404 Not Found : Device not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "500 Internal Server Error" });
    console.log(error);
  }
};
