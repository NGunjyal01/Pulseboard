const User = require("../../models/user");

const getAll = async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.user.id}).populate("friends", "firstName lastName email _id imageUrl friends createdAt");
        const {friends} = user;
        return res.status(200).json({
            success:true,
            friends,
            message:"Fetched All Friends List Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = getAll;