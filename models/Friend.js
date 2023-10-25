// models/Friend.js
const { Schema, model } = require("mongoose");

const friendSchema = new Schema({
  // Reference to the User model for the current user
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Reference to the User model for the friend
  friend: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Friend = model("Friend", friendSchema);

module.exports = Friend;
