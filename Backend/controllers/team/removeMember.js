const Team = require("../../models/team");

const removeMember = async(req,res)=>{
    try{
        const {teamId,memberId} = req.body;
        const userId = req.user.id;
        const team = await Team.findById(teamId);
        if(!team){
            throw new Error("Team Does not Exists");
        }
        const isAdmin = team.members.find(m=>m.user.toString()===userId.toString()).role!=='member';
        if(!isAdmin){
            throw new Error("Only Admin Can Remove Member");
        }
        const isMember = team.members.some(m => m.user.toString() === memberId.toString());
        if(!isMember){
            throw new Error(`${memberId} is not a Member of team ${teamId}`);
        }
        const updatedMembers = team.members.filter(m => m.user.toString()!==memberId.toString());
        const updatedTeam = await Team.findByIdAndUpdate(
            teamId,
            { $set: { members: updatedMembers } },
            { new: true } 
        )
        if(!updatedTeam){
            throw new Error("Error While Updating Team");
        }
        return res.status(200).json({
            success:true,
            message:`${memberId} is Removed Successfully`,
            teamDetails:updatedTeam
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

module.exports = removeMember;