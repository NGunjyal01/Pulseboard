const User = require('../../models/user');

const removeFriend = async (req, res) => {
    try {
        const { friendEmail } = req.body;
        const {id:userId} = req.user;
        if (!friendEmail) {
            return res.status(400).json({ message: 'FriendEmail is required.' });
        }
        const user = await User.findById(userId);
        const friend = await User.findOne({ email: friendEmail });
        if (!user || !friend) {
            return res.status(404).json({ message: 'user or friend not found.' });
        }

        // Remove friend from user's friends list
        user.friends = user.friends.filter(f => f.toString() !== friend._id.toString());
        // Remove user from friend's friends list
        friend.friends = friend.friends.filter(f => f.toString() !== userId.toString());
        await Promise.all([user.save(),friend.save()]);

        return res.status(200).json({ 
            success: true,
            message: 'Friend removed successfully.' });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: 'Server error.', 
            error: error.message });
    }
};

module.exports = removeFriend;