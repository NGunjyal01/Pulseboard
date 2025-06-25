
const logout = async (req,res)=>{
    try{
        res.clearCookie("token").json({
            success: true,
            message: "Logout successful"
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = logout;