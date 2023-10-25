
const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      // Fetch all users and populate their friends and thoughts
      const users = await User.find()
        .populate("friends") // Populate the 'friends' field
        .populate("thoughts"); // Populate the 'thoughts' field
      // Return the users in the response
      res.json(users);
    } catch (err) {
      // Handle any errors and send a 500 Internal Server Error response
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Get one user
  async getSingleUser(req, res) {
    try {
      // Find a single user by their ID and populate their thoughts
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v") // Exclude the '__v' field
        .populate({ path: "thoughts", select: "-_v" }); // Populate the 'thoughts' field
      // If the user doesn't exist, return a 404 Not Found response
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      // Return the user in the response
      res.json(user);
    } catch (err) {
      // Handle any errors and send a 500 Internal Server Error response
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Create User
  async createUser(req, res) {
    try {
      // Create a new user with the data from the request body
      const dbUserData = await User.create(req.body);
      // Return the newly created user in the response
      res.json(dbUserData);
    } catch (err) {
      // Handle any errors and send a 500 Internal Server Error response
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      // Find and update a user by their ID with the data from the request body
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true } // Return the updated user
      );
      // Return the updated user in the response
      res.json(user);
    } catch (err) {
      // Handle any errors and send a 500 Internal Server Error response
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      // Find and remove a user by their ID
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      // If the user doesn't exist, return a 404 Not Found response
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      // Delete thoughts that belong to the user
      await Thought.deleteMany({ user: req.params.userId });
      // Return a success message in the response
      res.json({ message: "User successfully deleted" });
    } catch (err) {
      // Handle any errors and send a 500 Internal Server Error response
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Add a new friend
  async addFriend(req, res) {
    try {
      // Find the user and friend by their IDs
      const user = await User.findById(req.params.userId);
      const friend = await User.findById(req.params.friendId);
      // If the user or friend doesn't exist, return a 404 Not Found response
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!friend) {
        return res.status(404).json({ message: "Friend not found" });
      }
      // If the friend is not already in the user's friends list, add them and save
      if (!user.friends.includes(req.params.friendId)) {
        user.friends.push(req.params.friendId);
        await user.save();
      }
      // Return the updated user in the response
      res.json(user);
    } catch (err) {
      // Handle any errors and send a 500 Internal Server Error response
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Delete a friend
  async deleteFriend(req, res) {
    try {
      // Find the user by their ID
      const user = await User.findById(req.params.userId);
      // If the user doesn't exist, return a 404 Not Found response
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Find the index of the friend in the user's friends list
      const friendIndex = user.friends.indexOf(req.params.friendId);
      // If the friend is not found in the list, return a 404 Not Found response
      if (friendIndex === -1) {
        return res.status(404).json({ message: "Friend not found" });
      }
      // Remove the friend from the user's friends list and save
      user.friends.splice(friendIndex, 1);
      await user.save();
      // Return the updated user in the response
      res.json(user);
    } catch (err) {
      // Handle any errors and send a 500 Internal Server Error response
      console.error(err);
      res.status(500).json(err);
    }
  },
};
