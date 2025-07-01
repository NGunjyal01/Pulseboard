//this can be used for reject req and cancel req
const FriendRequest = require("../../models/friendRequest");

const reject = async (req,res)=>{
    try{
        const {from} = req.params;
        const to = req.user._id;
        const request = await FriendRequest.findOneAndDelete({
            from,
            to
        });
        if(!request){
            throw new Error("Friend request not found");
        }
        return res.status(200).json({
            success: true,
            message: "Friend request rejected"
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = reject;