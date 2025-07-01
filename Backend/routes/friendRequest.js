const express = require("express");
const router = express.Router();

const send = require("../controllers/friendRequest/send");
const reject = require("../controllers/friendRequest/reject");
const accept = require("../controllers/friendRequest/accept");

router.post("/send/:to" ,send);
router.delete("/reject/:from",reject);
router.delete("/accept/:from",accept);

module.exports = router;