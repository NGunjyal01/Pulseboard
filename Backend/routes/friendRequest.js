const express = require("express");
const router = express.Router();

const send = require("../controllers/friendRequest/send");
const reject = require("../controllers/friendRequest/reject");
const accept = require("../controllers/friendRequest/accept");
const incoming = require("../controllers/friendRequest/incoming");
const outgoing = require("../controllers/friendRequest/outgoing");

router.post("/send/:to" ,send);
router.delete("/reject/:from",reject);
router.delete("/accept/:from",accept);
router.get("/incoming",incoming);
router.get("/outgoing",outgoing);

module.exports = router;