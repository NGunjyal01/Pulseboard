const FriendRequest = require("../../models/friendRequest");
const User = require("../../models/user");

const accept = async(req,res)=>{
    try{
        const {from} = req.params;
        const to = req.user.id;
        const request = await FriendRequest.findOneAndDelete({from,to});
        if(!request){
            throw new Error("Friend Request not found");
        }
        const fromUser = await User.findById(from);
        const toUser = await User.findById(to);
        fromUser.friends.push(to);
        toUser.friends.push(from);
        await Promise.all([fromUser.save(),toUser.save()]);
        const {pasword,...newFriend} = toUser;
        return res.status(200).json({
            success: true,
            newFriend,
            message: "Friend Request accepted"
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = accept;