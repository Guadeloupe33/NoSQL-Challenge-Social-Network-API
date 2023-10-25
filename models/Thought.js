const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Define the structure of the thought document
const thoughtSchema = new Schema(
  {
    // The main content of the thought, limited to 280 characters
    thoughtText: {
      type: String,
      required: true,     // Thought content is required
      maxlength: 280,     // Limit the length of thought content
    },
    // Timestamp for when the thought was created
    createdAt: {
      type: Date,
      default: Date.now,       // Set the default value to the current date and time
      get: (timestamp) => timestamp.toLocaleString(), // Format the timestamp as a string
    },
    // Username of the user who created the thought
    username: {
      type: String,
      required: true,     // Username is required
    },
    // Array of reactions associated with the thought
    reactions: [reactionSchema], // Use the previously defined reactionSchema
    // Reference to the User model for the user who created the thought
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,   // Include virtual properties in the JSON representation
      getters: true,    // Apply getters when converting to JSON
    },
    id: false,            // Exclude the auto-generated _id field
  }
);

// Create a virtual field to get the count of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create the Thought model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
