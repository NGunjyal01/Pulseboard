const Team = require("../../models/team");

const create = async (req,res)=>{
    try{
        const {name,members} = req.body;
        const description = req.body.description || null;
        const imageUrl = req.body.imageUrl || null;
        const createdBy = req.user.id;
        const team = new Team({name,members,description,imageUrl,createdBy});
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