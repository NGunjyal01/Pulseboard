const express = require("express");
const router = express.Router();

const send = require("../controllers/friendRequest/send");
const reject = require("../controllers/friendRequest/reject");
const accept = require("../controllers/friendRequest/accept");
const incoming = require("../controllers/friendRequest/incoming");
const outgoing = require("../controllers/friendRequest/outgoing");
const cancel = require("../controllers/friendRequest/cancel");

router.post("/send/:to" ,send);
router.delete("/reject/:from",reject);
router.delete("/accept/:from",accept);
router.delete("/cancel/:to",cancel);
router.get("/incoming",incoming);
router.get("/outgoing",outgoing);

module.exports = router;