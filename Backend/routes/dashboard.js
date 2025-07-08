const express = require("express");
const router = express.Router();
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() });

const createDashboard = require("../controllers/dashboard/create");
const updateBasicInfo = require("../controllers/dashboard/updateBasicInfo");
const { uploadCSV,connectAPI } = require("../controllers/dashboard/updateDataSource");

router.post('create',createDashboard);
router.put('step1/:id',updateBasicInfo);
router.post('step2/upload-csv/:id',upload.single('file'),uploadCSV);
router.post('step2/connectAPI/:id',connectAPI);

module.exports = router;