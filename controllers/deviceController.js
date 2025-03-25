const License = require("../models/device");

const tokens = {
  licenses: "8WExtIIw8oGgb4cFh09MkTrgvrYjQL9pFWtjYkbPhrkl0z8Tjoz7WtaSs8oByQWp",
};

const datetimeformat = (date) => {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  let returnstring = [date.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("");
  returnstring = returnstring + " " + date.getHours() + ":" + date.getMinutes() + ":00";
  return returnstring;
};

const tokenIsInvalid = (tokenBearingRequest) => {
  return tokenBearingRequest.headers.authorization.replace("Bearer ", "") !== tokens.licenses || tokenBearingRequest.headers.authorization == null;
};

exports.getAllLicenses = async (req, res) => {
  if (tokenIsInvalid(req)) {
    res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
    return;
  }

  try {
    const licenses = await License.findAll();
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ error: "500 Internal Server Error" });
    console.log(error);
  }
};

// CA VEUT PAS S'EXECUTE
exports.createLicense = async (req, res) => {
  if (tokenIsInvalid(req)) {
    res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
    return;
  }

  const { name, client, email, platform } = req.body;

  const createdAt = new Date();
  const updatedAt = new Date();

  const employee_name = null;
  const employee_email = null;

  const status = "inactive";

  const id = (await License.max("id")) + 1;

  try {
    const newLicense = await License.create({
      id,
      name,
      client,
      employee_name,
      employee_email,
      status,
      email,
      platform,
      createdAt,
      updatedAt,
    });
    res.status(201).json(newLicense);
  } catch (error) {
    res.status(500).json({ error: "500 Internal Server Error" });
    console.log(error);
  }
};

// Controller method to get a license by ID
exports.getLicenseByEmail = async (req, res) => {
  if (tokenIsInvalid(req)) {
    res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
    return;
  }

  const reqemail = req.params.email;

  try {
    const license = await License.findOne({ where: { email: reqemail } });
    if (license) {
      res.json(license);
    } else {
      res.status(404).json({ error: "404 Not Found : License not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "500 Internal Server Error" });
    console.log(error);
  }
};

// Controller method to update a license status by its email
exports.updateLicense = async (req, res) => {
  if (tokenIsInvalid(req)) {
    res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
    return;
  }

  const reqemail = req.params.email;
  const { status, employee_name, employee_email, updatedAt } = req.body;
  console.log(JSON.stringify(req.body, null, 4));

  try {
    const license = await License.findOne({ where: { email: reqemail } });
    if (license) {
      license.status = status;
      license.employee_name = employee_name;
      license.employee_email = employee_email;
      license.updatedAt = updatedAt;
      await license.save();
      res.json(license);
    } else {
      res.status(404).json({ error: "404 Not Found : License not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "500 Internal Server Error" });
    console.log(error);
  }
};

exports.releaseUsedLicenses = async (req, res) => {
  if (tokenIsInvalid(req)) {
    res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
    return;
  }

  try {
    const licenses = await License.update(
      { status: "inactive", employee_name: "", employee_email: "", updatedAt: datetimeformat(new Date()) },
      { where: { status: "active", platform: "netsuite" } }
    );
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ error: "500 Internal Server Error" });
    console.log(error);
  }
};

// Controller method to delete a license by its email
exports.deleteLicense = async (req, res) => {
  if (tokenIsInvalid(req)) {
    res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
    return;
  }

  const reqemail = req.params.email;

  try {
    const license = await License.findOne({ where: { email: reqemail } });
    if (license) {
      await license.destroy();
      res.json(license);
    } else {
      res.status(404).json({ error: "404 Not Found : License not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "500 Internal Server Error" });
    console.log(error);
  }
};

// Controller method to get all active licenses
exports.getUsedLicenses = async (req, res) => {
  if (tokenIsInvalid(req)) {
    res.status(401).json({ error: "401 Unauthorized : Unauthentified User" });
    return;
  }

  try {
    const license = await License.findAll({ where: { status: "active" } });
    if (license) {
      res.json(license);
    } else {
      res.status(404).json({ error: "404 Not Found : No active license found" });
    }
  } catch (error) {
    res.status(500).json({ error: "500 Internal Server Error" });
    console.log(error);
  }
};
