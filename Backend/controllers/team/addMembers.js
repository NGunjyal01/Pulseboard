const Team = require("../../models/team");

const addMembers = async(req,res)=>{
    try{
        const userId = req.user._id;
        const {teamId,members} = req.body;
        const team = await Team.findById(teamId);
        if(!team){
            throw new Error("team Does not Exists");
        }
        const isAdmin = team.admin.toString()===userId.toString();
        if(!isAdmin){
            throw new Error("Only Admin Can Add new Members");
        }
        const isAllMembersAreFriends = members.some(memberId => req.user.friends.includes(memberId));
        if(!isAllMembersAreFriends){
            throw new Error("Some members are not your friend");
        }
        const includesAnyMember = members.some(memberId => team.members.includes(memberId));
        if(includesAnyMember){
            throw new Error("Some members already present");
        }
        const updatedMembers = [...team.members,...members];
        const updatedteam = await Team.updateOne({_id:teamId},{
            $set:{
                members:updatedMembers
            }
        });
        if(!updatedteam){
            throw new Error("Error While Adding New Members");
        }
        return res.status(200).json({
            success:true,
            message:"Successfully Added Members"
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

module.exports = addMembers;