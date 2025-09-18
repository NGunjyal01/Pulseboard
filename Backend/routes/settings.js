const express = require("express");
const updateProfile = require("../controllers/settings/updateProfile");
const updateEmail = require("../controllers/settings/updateEmail");
const updatePassword = require("../controllers/settings/updatePassword");
const upload = require("../middleware/upload");
const router = express.Router();


router.put('/updateProfile',upload.single("imageUrl"),updateProfile);
router.put('/updateEmail',updateEmail);
router.put('/updatePassword',updatePassword);

module.exports = router;