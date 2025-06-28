const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

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
        const user = await User.create({ firstName, lastName, email, password: hashPassword });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        const {password,...userWithoutPassword} = user.toObject();
        return res.status(200).json({ 
            success: true,
            message: "User created successfully",
            token, user:userWithoutPassword });
    } catch (error) {
        return res.status(500).json({
        success: false,
        message: error.message});
    }
}

module.exports = signup;