const express = require("express");
const router = express.Router();
const influxController = require("./controller");

/////////// V1 VERSION //////////
router.get("/", influxController.queryAll);

router.post("/", influxController.writeToInflux);

// router.get("/name/:name", deviceController.getDeviceByName);

// router.put("/name/:name", deviceController.updateDevice);

// router.delete("/name/:name", deviceController.deleteDevice);

module.exports = router;
