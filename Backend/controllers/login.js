const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) 
            return res.status(400).json({ 
                success: false,
                error: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) 
            return res.status(400).json({ 
                success: false,
                error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, email:user.email }, JWT_SECRET, { expiresIn: '7d' });
        return res.cookie("token", token, {
            httpOnly: true,
            secure: false,         // false for localhost
            sameSite: "lax",       // lax works fine for localhost
            maxAge: 604800000,     // 7 days
            }).json({ 
            success:true,
            message: "Login Successful",
            user });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error' });
    }
}

module.exports = login;