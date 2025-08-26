const FriendRequest = require("../../models/friendRequest");

const outgoing = async (req, res) => {
  try {
    const userId = req.user.id;
    const outgoing = await FriendRequest.find({ from: userId }).populate("to", "firstName lastName email imageUrl");
    return res.status(200).json({
        success:true,
        outgoing,
    });
  } catch (err) {
    return res.status(500).json({ 
        success:false,
        error: err.message });
  }
}

module.exports = outgoing;