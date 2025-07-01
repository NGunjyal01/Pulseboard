const Team = require("../../models/team");

const getDetails = async(req,res)=>{
    try{
        const {teamId} = req.body;
        const team = await Team.findById(teamId)
        .populate("members","firstName lastName userName photoUrl")
        .populate("transactions");
        if(!team){
            throw new Error("Team Does not Exists");
        }
        return res.status(200).json({
            success:true,
            teamDetails:team,
            message: "Successfully Fetched Team Details"
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

module.exports = getDetails;