const connection = require("../config/connection");
const { User, Thought } = require("../models");

// Define seed data with more creative and unique thoughts
const thoughtData = [
  {
    thoughtText: "Imagine a world where cats can talk and discuss their daily adventures...",
    username: "catlover123",
    userId: "1",
  },
  {
    thoughtText: "What if we could fly without the need for airplanes or wings? How amazing would that be?",
    username: "flightdreamer",
    userId: "2",
  },
  {
    thoughtText: "In a parallel universe, we might be having this conversation in a completely different language...",
    username: "multiverseexplorer",
    userId: "3",
  },
  {
    thoughtText: "What if time travel was possible? I'd love to visit ancient civilizations and witness history firsthand.",
    username: "timetraveler2023",
    userId: "4",
  },
  {
    thoughtText: "If trees could communicate, they'd have some fascinating stories to share about the changing seasons.",
    username: "naturelover",
    userId: "5",
  },
];

// Define user data
const userData = [
  {
    username: "catlover123",
    email: "catlover123@gmail.com",
  },
  {
    username: "flightdreamer",
    email: "flightdreamer@gmail.com",
  },
  {
    username: "multiverseexplorer",
    email: "multiverseexplorer@gmail.com",
  },
  {
    username: "timetraveler2023",
    email: "timetraveler2023@gmail.com",
  },
  {
    username: "naturelover",
    email: "naturelover@gmail.com",
  },
];

// Start the seeding runtime timer
console.time("seeding");

// Create connection to MongoDB
connection.once("open", async () => {
  try {
    // Drop collections if they exist
    await Promise.all([User.collection.drop(), Thought.collection.drop()]);

    // Insert user data into the User collection
    const userList = await User.insertMany(userData);

    // Insert thought data into the Thought collection
    thoughtData.forEach((thought, index) => {
      thought.userId = userList[index]._id;
    });
    const thoughtList = await Thought.insertMany(thoughtData);

    // Assign each thought to a random user
    for (const thought of thoughtList) {
      const randomUser = userList[Math.floor(Math.random() * userList.length)];
      randomUser.thoughts.push(thought._id);
      await randomUser.save();
    }

    // Print the results
    console.log("User data inserted:", userList);
    console.log("Thought data inserted:", thoughtList);
    console.timeEnd("Seeding Complete");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    process.exit(0);
  }
});
