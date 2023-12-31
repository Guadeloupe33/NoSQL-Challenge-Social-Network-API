const { User, Thought, Reaction } = require("../models");
const { ObjectId } = require("mongoose").Types;


module.exports = {
    //Get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }
      );

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } }
      );

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },



  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      //Add to associated users thought array
      if (thought.user) {
        //Find user thought current thought user id
        const user = await User.findById(thought.user);
        if (user) {
          user.thoughts.push(thought._id);
          await user.save();
        }
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndRemove(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      //Remove from user if it is in user list
      if (thought.user) {
        const user = await User.findById(thought.user);
        if (user) {
          const thoughtIndex = user.thoughts.indexOf(thought._id);
          if (thoughtIndex !== -1) {
            user.thoughts.splice(thoughtIndex, 1);
            await user.save();
          }
        }
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

};