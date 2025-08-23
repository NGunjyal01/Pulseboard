const User = require("../models/user");
const bcrypt = require('bcryptjs');

const pfpUrl = process.env.PFP_URL;

const signup = async (req, res) => {    
    try {
        const { firstName, lastName, email, password:inputPassword } = req.body;
        const existing = await User.findOne({ email });
        if (existing)            
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });

        const hashPassword = await bcrypt.hash(inputPassword, 10);
        const user = await User.create({ firstName, lastName, email, password: hashPassword,
            imageUrl: `${pfpUrl}${firstName} ${lastName}`
         });

        const {password,...userWithoutPassword} = user.toObject();
        return res.status(200).json({ 
            success: true,
            message: "User created successfully",
            user:userWithoutPassword });
    } catch (error) {
        return res.status(500).json({
        success: false,
        message: error.message});
    }
}

module.exports = signup;