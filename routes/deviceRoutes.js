const express = require("express");
const router = express.Router();
const licenseController = require("../controllers/deviceController");

/////////// V1 VERSION //////////
router.get("/", licenseController.getAllLicenses);

router.post("/", licenseController.createLicense);

router.get("/email/:email", licenseController.getLicenseByEmail);

router.put("/email/:email", licenseController.updateLicense);

router.delete("/email/:email", licenseController.deleteLicense);

router.get("/used/", licenseController.getUsedLicenses);
router.post("/used/remove", licenseController.releaseUsedLicenses);

module.exports = router;
