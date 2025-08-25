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
        
        await user.save();

        // Remove user from friend's friends list
        friend.friends = friend.friends.filter(f => f.toString() !== userId.toString());
        await friend.save();

        res.status(200).json({ message: 'Friend removed successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = removeFriend;