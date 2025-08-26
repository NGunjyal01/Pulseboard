const FriendRequest = require("../../models/friendRequest");

const incoming = async (req, res) => {
  try {
    const userId = req.user.id;

    const incoming = await FriendRequest.find({ to: userId }).populate("from", "firstName lastName email imageUrl");

    return res.status(200).json({
        success:true,
        incoming,
    });
  } catch (err) {
    return res.status(500).json({ 
        success:false,
        error: err.message });
  }
}

module.exports = incoming;