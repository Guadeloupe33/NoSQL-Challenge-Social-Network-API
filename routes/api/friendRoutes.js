// routes/api/friend-routes.js
const router = require("express").Router();
const {
  addFriend,
  deleteFriend,
  getFriends,
} = require("../../controllers/friendController");

// Route: Add a friend for a specific user
router.route("/:userId/friends")
  .post(addFriend);

// Route: Delete a friend for a specific user
router.route("/:userId/friends/:friendId")
  .delete(deleteFriend);

// Route: Get friends for a specific user
router.route("/:userId/friends")
  .get(getFriends);

module.exports = router;
