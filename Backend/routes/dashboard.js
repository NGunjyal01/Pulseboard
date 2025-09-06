const express = require("express");
const router = express.Router();
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() });

const createDashboard = require("../controllers/dashboard/create");
const updateBasicInfo = require("../controllers/dashboard/updateBasicInfo");
const { uploadCSV,connectAPI,simulateData,publishDashboard } = require("../controllers/dashboard/updateDataSource");
const getAll = require("../controllers/dashboard/getAll");
const deleteDashboard = require("../controllers/dashboard/deleteDashboard");

router.post('/create',createDashboard);
router.put('/step1/:id',updateBasicInfo);
router.post('/step2/upload-csv/:id',upload.single('file'),uploadCSV);
router.post('/step2/connectAPI/:id',connectAPI);
router.post('/step2/simulate-data/:id',simulateData);
router.post('/publish/:id',publishDashboard);
router.get('/getAll',getAll);
router.delete('/delete/:id',deleteDashboard);

module.exports = router;