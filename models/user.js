const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

//represents a single message sent in a chat
const userSchema = Schema({
  created: {
    type: Date,
    default: Date.now
  },
  chatRooms: [ObjectId],
  username: String

})

module.exports = mongoose.model('User', userSchema)

const User = module.exports = mongoose.model('User', userSchema)

module.exports.createNewUser = (username, callback) => {

  const newUser = new User({
    created: Date.now(),
    chatRooms: [],
    username
  })
  newUser.save((err, user) => {
    if (err) {
      console.log(err)
    }
    else callback(user)
  })
}

module.exports.getAllUsers = (callback) => {
  User.find({}, (err, users) => {
    let userMap = {}

    users.forEach((user) => {
      userMap[user._id] = user;
    });
    console.log(userMap);
    callback(userMap)
  });
}
