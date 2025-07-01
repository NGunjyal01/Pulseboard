const Team = require("../../models/team");

const create = async (req,res)=>{
    try{
        const {name} = req.body;
        const admin = req.user._id;
        const members = [admin];
        const description = req.body.description || null;
        const team = new Team({name,admin,members,description});
        await team.save();
        return res.status(200).json({
            success:true,
            message: "Team Created Successfully"
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

module.exports = create;