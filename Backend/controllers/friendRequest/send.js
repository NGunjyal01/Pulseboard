const FriendRequest = require("../../models/friendRequest");

const send = async (req,res)=>{
    try{
        const {to} = req.params;
        const fromUser = req.user;
        const from = fromUser._id;

        const isFriends = fromUser.friends.includes(to);
        if(isFriends){
            throw new Error("Already Friends");
        }
        const newRequest = new FriendRequest({from,to});
        const request = await FriendRequest.findOne({
            $or:[
                {from:from , to:to},
                {from:to, to:from}
            ]
        });
        if(request){
            throw new Error("Friend request already sent");
        }
        await newRequest.save();
        return res.status(200).json({
            success: true,
            message: "Friend request sent"
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = send;