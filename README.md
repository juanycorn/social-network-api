# Social Network API

## Description

This is a social network API built using Express.js, MongoDB, and Mongoose. Users can share their thoughts, react to friends' thoughts, and create a friend list. The application handles large amounts of unstructured data efficiently with a NoSQL database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
  - [User Routes](#user-routes)
  - [Thought Routes](#thought-routes)
- [Models](#models)
  - [User Model](#user-model)
  - [Thought Model](#thought-model)
  - [Reaction Schema](#reaction-schema)
- [Walkthrough Video](#walkthrough-video)

## Installation

1. Clone the repository:
```bash
   git clone https://github.com/juanycorn/social-network-api.git
   cd social-network-api
```
2. install dependencies:
```bash
    npm i
```
3. start the application:
```bash
npm run dev
```
the server will start on `http://localhost:3001`.

## Usage

Use Insomnia or any other API testing tool to interact with the API. The following sections detail the available routes and their functionalities.

## API Routes
### User Routes
- GET /api/users
    - Retrieves all users.
- GET /api/users/
    - Retrieves a single user by its _id and populates thought and friend data.
- POST /api/users
    - Creates a new user.
```json
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```
- PUT /api/users/
    - Updates a user by its _id.
- DELETE /api/users/
    - Removes a user by its _id. Associated thoughts are also deleted.
- POST /api/users/
  /friends/
    - Adds a new friend to a user's friend list.
- DELETE /api/users/
  /friends/
    - Removes a friend from a user's friend list.
### Thought Routes
- GET /api/thoughts
    - Retrieves all thoughts.
- GET /api/thoughts/
    - Retrieves a single thought by its _id.
- POST /api/thoughts
    - Creates a new thought and pushes the created thought's _id to the associated user's thoughts array field.
```json
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```
- PUT /api/thoughts/
    - Updates a thought by its _id.
- DELETE /api/thoughts/
    - Removes a thought by its _id.
- POST /api/thoughts/
  /reactions
    - Creates a reaction stored in a single thought's reactions array field.
- DELETE /api/thoughts/
  /reactions/
    Removes a reaction by the reaction's reactionId value.

## Models
### User Model
- username: String, Unique, Required, Trimmed
- email: String, Required, Unique, Must match a valid email address
- thoughts: Array of _id values referencing the Thought model
- friends: Array of _id values referencing the User model (self-reference)

### Thought Model
- thoughtText: String, Required, Must be between 1 and 280 characters
- createdAt: Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query
- username: String, Required
- reactions: Array of nested documents created with the reactionSchema

### Reaction Schema (SCHEMA ONLY)
- reactionId: Use Mongoose's ObjectId data type, Default value is set to a new ObjectId
- reactionBody: String, Required, 280 character maximum
- username: String, Required
- createdAt: Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query

## Walkthrough Video
[A walkthrough video demonstrating the functionality of the application](https://example.com)
