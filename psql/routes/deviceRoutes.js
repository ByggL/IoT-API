const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");

/////////// V1 VERSION //////////
router.get("/", deviceController.getAllDevices);

router.post("/", deviceController.createDevice);

router.get("/name/:name", deviceController.getDeviceByName);

router.put("/name/:name", deviceController.updateDevice);

router.delete("/name/:name", deviceController.deleteDevice);

module.exports = router;
