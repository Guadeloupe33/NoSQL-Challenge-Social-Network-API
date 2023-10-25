const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const cwd = process.cwd(); // Get the current working directory

const PORT = 3001;
const activity = "Your API Activity"; // Define the activity variable

const app = express();

// Middleware: Parse incoming requests with JSON payloads
app.use(express.json());

// Middleware: Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Mount your routes
app.use(routes);

// MongoDB connection event listener
db.once("open", () => {
  // Start the Express server and listen on the specified port
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
