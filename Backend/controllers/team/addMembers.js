const Team = require("../../models/team");

const addMembers = async(req,res)=>{
    try{
        const userId = req.user.id;
        const {teamId,members} = req.body;
        const team = await Team.findById(teamId);
        if(!team){
            throw new Error("team Does not Exists");
        }
        const canAddMembers = !(team.members.find(m=>m.user.toString()===userId.toString())).role!=='member';
        if(!canAddMembers){
            throw new Error("Only Admin/Owners Can Add new Members");
        }
        const includesAnyMember = members.some(memberId =>
            team.members.some(m => m.user.toString() === memberId.toString())
        );

        if (includesAnyMember) {
            throw new Error("Some members already present");
        }

        const newMembers = members.map(userId => ({
            user: userId,
            role: "member",
            joinedAt: new Date()
        }));
        const updatedMembers = [...team.members, ...newMembers];
        const updatedTeam = await Team.findByIdAndUpdate(
            teamId,
            { $set: { members: updatedMembers } },
            { new: true }
            ).populate({
            path: 'members.user',
            select: 'firstName lastName imageUrl email createdAt'
        });
        if(!updatedTeam){
            throw new Error("Error While Adding New Members");
        }
        return res.status(200).json({
            success:true,
            team:updatedTeam,
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