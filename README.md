# NoSQL-Challenge-Social-Network-API



Social Network API
Description
This is a NoSQL-based social network API built using Node.js and Mongoose. It allows you to manage users, thoughts, reactions, and friends in a structured manner. The API is designed to handle large amounts of unstructured data, making it suitable for a social media startup.

Table of Contents
Installation
Usage
Routes
Testing
Contributing
License
Installation
To install the necessary dependencies, run:

bash
Copy code
npm install
Make sure you have MongoDB installed and running locally or provide the MongoDB connection string in a .env file.

Usage
Start the application by running:
bash
Copy code
npm start
Use your preferred API client (e.g., Insomnia, Postman) to interact with the API.
Routes
The API provides the following routes:

Users

GET /api/users: Get all users.
GET /api/users/:userId: Get a single user by ID.
POST /api/users: Create a new user.
PUT /api/users/:userId: Update a user by ID.
DELETE /api/users/:userId: Delete a user by ID.
Thoughts

GET /api/thoughts: Get all thoughts.
GET /api/thoughts/:thoughtId: Get a single thought by ID.
POST /api/thoughts: Create a new thought.
PUT /api/thoughts/:thoughtId: Update a thought by ID.
DELETE /api/thoughts/:thoughtId: Delete a thought by ID.
Reactions

POST /api/thoughts/:thoughtId/reactions: Create a new reaction for a thought.
DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Delete a reaction for a thought.
Friends

POST /api/users/:userId/friends/:friendId: Add a friend to a user's friend list.
DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user's friend list.
Testing
Use an API testing tool like Insomnia or Postman to test the API:

Start the server using npm start.
Import the provided Insomnia workspace.
Use the routes to interact with the API.


License
This project is licensed under the MIT License 