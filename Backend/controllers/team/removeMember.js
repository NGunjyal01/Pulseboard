const Team = require("../../models/team");

const removeMember = async(req,res)=>{
    try{
        const {teamId,member} = req.body;
        const userId = req.user._id;
        const team = await Team.findById(teamId);
        if(!team){
            throw new Error("Team Does not Exists");
        }
        const isAdmin = team.admin.toString() === userId.toString();
        if(!isAdmin){
            throw new Error("Only Admin Can Remove Member");
        }
        const isMember = team.members.includes(member);
        if(!isMember){
            throw new Error(`${member} is not a Member of team ${teamId}`);
        }
        const updatedMembers = team.members.filter(memberId => memberId.toString()!==member.toString());
        const updatedteam = await team.updateOne({_id:teamId},{
            $set:{
                members:updatedMembers
            }
        });
        if(!updatedteam){
            throw new Error("Error While Updating Team");
        }
        return res.status(200).json({
            success:true,
            message:`${member} is Removed Successfully`
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