const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController.js");

// Import addFriend and deleteFriend from friendController.js
const { addFriend, deleteFriend } = require("../../controllers/friendController.js");

// Routes related to users

// Route: Get all users and create a new user
router.route("/")
  .get(getUsers)    // Get all users
  .post(createUser); // Create a new user

// Route: Get, update, or delete a single user by ID
router.route("/:userId")
  .get(getSingleUser) // Get a single user by ID
  .put(updateUser)    // Update a single user by ID
  .delete(deleteUser); // Delete a single user by ID

// Routes related to managing friends for a specific user

// Route: Add or delete a friend for a specific user
router.route("/:userId/friends/:friendId")
  .post(addFriend)   // Add a new friend for the specified user
  .delete(deleteFriend); // Delete a friend for the specified user

module.exports = router;
