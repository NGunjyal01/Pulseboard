const User = require("../../models/user");
const FriendRequest = require("../../models/friendRequest");

const send = async (req, res) => {
  try {
    const { to } = req.params;
    const fromUser = req.user;
    const from = fromUser.id;

    // Check if the recipient exists
    const toUser = await User.findOne({email:to});
    if (!toUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    const toUserId = toUser._id.toString();
    // Check if already friends
    if (Array.isArray(fromUser.friends) && 
    fromUser.friends.includes(toUserId)) {
      return res.status(409).json({
        success: false,
        message: "Already Friends"
      });
    }

    // Check if a friend request already exists in either direction
    const request = await FriendRequest.findOne({
      $or: [
        { from: from, to: toUserId },
        { from: toUserId , to: from }
      ]
    });
    if (request) {
      return res.status(409).json({
        success: false,
        message: "Friend request already sent"
      });
    }

    // Create and save the friend request
    let newRequest = new FriendRequest({ from, to:toUserId });
    await newRequest.save();
    newRequest = await newRequest.populate("to", "firstName lastName email imageUrl");
    return res.status(200).json({
      success: true,
      request: newRequest,
      message: "Friend request sent"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = send;
