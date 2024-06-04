const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

const users = [
  {
    username: "johndoe",
    email: "johndoe@example.com",
    thoughts: [],
    friends: []
  },
  {
    username: "janedoe",
    email: "janedoe@example.com",
    thoughts: [],
    friends: []
  },
  {
    username: "alice",
    email: "alice@example.com",
    thoughts: [],
    friends: []
  },
  {
    username: "bob",
    email: "bob@example.com",
    thoughts: [],
    friends: []
  }
];

const thoughts = [
  {
    thoughtText: "This is a thought by John.",
    username: "johndoe",
    createdAt: new Date("2024-05-01T12:00:00Z"),
    reactions: []
  },
  {
    thoughtText: "This is a thought by Jane.",
    username: "janedoe",
    createdAt: new Date("2024-05-02T13:00:00Z"),
    reactions: []
  },
  {
    thoughtText: "This is a thought by Alice.",
    username: "alice",
    createdAt: new Date("2024-05-03T14:00:00Z"),
    reactions: []
  },
  {
    thoughtText: "This is a thought by Bob.",
    username: "bob",
    createdAt: new Date("2024-05-04T15:00:00Z"),
    reactions: []
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/socialNetworkDB');

    await User.deleteMany({});
    await Thought.deleteMany({});

    const createdUsers = await User.insertMany(users);
    console.log('Users seeded:', createdUsers);

    const createdThoughts = await Thought.insertMany(thoughts);
    console.log('Thoughts seeded:', createdThoughts);

    // Add thoughts to users
    for (let thought of createdThoughts) {
      await User.updateOne(
        { username: thought.username },
        { $push: { thoughts: thought._id } }
      );
    }

    console.log('Database seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
