const router = require("express").Router();
const {
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
  getThoughts,
  getSingleThought,
  createThought,
} = require("../../controllers/thoughtController.js");

// Routes related to thoughts

// Route: Get all thoughts and create a new thought
router.route("/")
  .get(getThoughts)    // Get all thoughts
  .post(createThought); // Create a new thought

// Route: Get, update, or delete a single thought by ID
router.route("/:thoughtId")
  .get(getSingleThought) // Get a single thought by ID
  .put(updateThought)    // Update a single thought by ID
  .delete(deleteThought); // Delete a single thought by ID

// Routes related to reactions for a specific thought

// Route: Create a new reaction for a specific thought
router.route("/:thoughtId/reactions")
  .post(addReaction); // Create a new reaction for the specified thought

// Route: Delete a specific reaction for a specific thought
router.route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction); // Delete a specific reaction for the specified thought

module.exports = router;
