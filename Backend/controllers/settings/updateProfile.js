const User = require("../../models/user");
const cloudinary = require("../../utils/cloudinary");
const streamifier = require("streamifier");

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName } = req.body;
        let updateData = {};

        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;

        // If file is uploaded, push it to Cloudinary
        if (req.file) {
            if (req.file.size > 2 * 1024 * 1024) {
                return res.status(400).json({ 
                    success: false, 
                    message: "File size must be less than 2MB" 
                });
            }
            const uploaded = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                { folder: "user_profiles" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
                );

                // Convert buffer → stream
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
            updateData.imageUrl = uploaded.secure_url;
        }

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

        return res.status(200).json({ success: true, user });
    } catch (err) {
        console.error("❌ updateProfile error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = updateProfile;
