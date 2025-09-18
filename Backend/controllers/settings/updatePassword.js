const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const updatePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "Both current and new password required" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Current password is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Update Password Error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = updatePassword;