const express = require("express");
const router = express.Router();

const create = require("../controllers/team/create");
const addMembers = require("../controllers/team/addMembers");
const removeMember = require("../controllers/team/removeMember");
const getDetails = require("../controllers/team/getDetails");

router.post("/create",create);
router.patch("/addMembers",addMembers);
router.patch("/removeMember",removeMember);
router.get("/getDetails",getDetails);

module.exports = router;