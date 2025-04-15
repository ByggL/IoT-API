const express = require("express");
const router = express.Router();
const deviceController = require("./controller");

/////////// V1 VERSION //////////
router.get("/", deviceController.queryAll);

router.post("/", deviceController.writeToInflux);

// router.get("/name/:name", deviceController.getDeviceByName);

// router.put("/name/:name", deviceController.updateDevice);

// router.delete("/name/:name", deviceController.deleteDevice);

module.exports = router;
