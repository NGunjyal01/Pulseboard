const express = require("express");
const router = express.Router();

const getAll = require("../controllers/friends/getAll");

router.get('/getAll',getAll);

module.exports = router;