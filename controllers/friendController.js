const { User } = require("../models");

const friendController = {
  // Add a friend for a specific user
  async addFriend(req, res) {
    try {
      const { userId } = req.params;
      const { friendUsername } = req.body;

      // Find the friend in the database
      const friend = await User.findOne({ username: friendUsername });

      if (!friend) {
        return res.status(404).json({ message: "Friend not found" });
      }

      const friendId = friend._id;

      // Add the friend's ID to the user's friends array
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } }, // $addToSet ensures no duplicates
        { new: true } // Return the updated user
      );

      res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },

  // Delete a friend for a specific user
  async deleteFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      // Remove the friend's ID from the user's friends array
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } }, // $pull to remove the specific friend
        { new: true } // Return the updated user
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },

  // Get friends for a specific user
  async getFriends(req, res) {
    try {
      const { userId } = req.params;

      // Find the user with userId and populate the friends
      const user = await User.findById(userId).populate("friends");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user.friends);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },
};

module.exports = friendController;
