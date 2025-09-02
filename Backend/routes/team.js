const express = require("express");
const router = express.Router();

const create = require("../controllers/team/create");
const addMembers = require("../controllers/team/addMembers");
const removeMember = require("../controllers/team/removeMember");
const getDetails = require("../controllers/team/getDetails");
const getAll = require("../controllers/team/getAll");
const sendInvite = require("../controllers/team/invite/send");
const acceptInvite = require("../controllers/team/invite/accept");
const rejectInvite = require("../controllers/team/invite/reject");
const cancelInvite = require("../controllers/team/invite/cancel");
const getAllInvitations = require("../controllers/team/invite/getAll");

router.post("/create",create);
router.post("/addMembers",addMembers);
router.post("/removeMember",removeMember);
router.get("/getDetails/:teamId",getDetails);
router.get('/getAll',getAll);
router.post('/sendInvite/:teamId',sendInvite);
router.delete('/acceptInvite/:inviteId',acceptInvite);
router.delete('/rejectInvite/:inviteId',rejectInvite);
router.delete('/cancelInvite/:inviteId',cancelInvite);
router.get('/getAllInvitations',getAllInvitations);

module.exports = router;