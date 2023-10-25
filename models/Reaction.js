const { Schema } = require("mongoose");

// Define the structure of the reaction document
const reactionSchema = new Schema(
  {
    // Content of the reaction, limited to 280 characters
    reactionBody: {
      type: String,
      required: true,     // Reaction content is required
      maxlength: 280,     // Limit the length of reaction content
    },
    // Username of the user who created the reaction
    username: {
      type: String,
      required: true,     // Username is required
    },
    // Timestamp for when the reaction was created
    createdAt: {
      type: Date,
      default: Date.now,       // Set the default value to the current date and time
      get: (timestamp) => timestamp.toLocaleString(), // Format the timestamp as a string
    },
  },
  {
    toJSON: {
      virtuals: true, // Include virtual properties in the JSON representation
    },
    id: false, // Exclude the auto-generated _id field
  }
);

// Export the reaction schema for use in your project
module.exports = reactionSchema;
