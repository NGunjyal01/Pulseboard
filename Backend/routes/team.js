const express = require("express");
const router = express.Router();

const create = require("../controllers/team/create");
const addMembers = require("../controllers/team/addMembers");
const removeMember = require("../controllers/team/removeMember");
const getDetails = require("../controllers/team/getDetails");
const getAll = require("../controllers/team/getAll");
const sendInvite = require("../controllers/team/sendInvite");

router.post("/create",create);
router.patch("/addMembers",addMembers);
router.patch("/removeMember",removeMember);
router.get("/getDetails/:teamId",getDetails);
router.get('/getAll',getAll);
router.post('/sendInvite/:teamId',sendInvite);

module.exports = router;