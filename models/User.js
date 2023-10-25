const { Schema, model } = require("mongoose");

// Define the user schema
const userSchema = new Schema({
  // User's username
  username: {
    type: String,
    unique: true,    // Each username must be unique
    required: true,  // Username is required
    trim: true,      // Trim whitespace from the input
  },
  // User's email
  email: {
    type: String,
    required: true,  // Email is required
    unique: true,    // Each email must be unique
    validate: {
      // Custom email validation using a regular expression
      validator: function (email) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
      },
      message: "Invalid Email Address", // Custom validation error message
    },
  },
  // Reference to user's thoughts
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought", // Reference to the Thought model
    },
  ],
  // Self-reference for user-to-user relationships (friends)
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to other User documents (friends)
    },
  ],
});

// Create a virtual field to calculate the friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create the User model
const User = model("User", userSchema);

module.exports = User;
