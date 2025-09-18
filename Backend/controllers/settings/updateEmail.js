const User = require("../../models/user");

const updateEmail = async (req, res) => {
    try {
        const userId = req.user.id;
        const { newEmail } = req.body;

        if (!newEmail) {
            return res.status(400).json({ success: false, message: "New email is required" });
        }

        // Check if email already exists
        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { email: newEmail } },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "Email updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Update Email Error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = updateEmail;