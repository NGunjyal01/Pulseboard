const express = require("express");
const router = express.Router();

const getAll = require("../controllers/friends/getAll");
const removeFriend = require("../controllers/friends/remove");

router.get('/getAll',getAll);
router.post('/remove',removeFriend);

module.exports = router;