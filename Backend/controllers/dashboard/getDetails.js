const Dashboard = require("../../models/dashboard");

const getDetails = async(req,res)=>{
    try{
        const { dashboardId } = req.params;

        const dashboard = await Dashboard.findById(dashboardId).populate("createdBy", "firstName lastName email _id imageUrl friends createdAt")  
        if (!dashboard) return res.status(404).json({ 
            success:false,
            message: "Dashboard not found" });
        return res.status(200).json({
            success: true,
            dashboardDetails: dashboard,
            message: "Successfully fetched Dashboard Details"
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports = getDetails;