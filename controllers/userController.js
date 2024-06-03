const User = require('../models/user');
const Thought = require('../models/Thought');

module.exports = {
  getUsers(req, res) {
    User.find()
      .populate('thoughts')
      .populate('friends')
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this ID' });
        }
        res.json(user);
      })
      .catch(err => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true, runValidators: true })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this ID' });
        }
        res.json(user);
      })
      .catch(err => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this ID' });
        }
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch(err => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'No user with this ID' });
      }
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'No user with this ID' });
      }
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
  }
};
