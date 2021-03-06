const mongoose = require('mongoose')
const { Schema } = mongoose

const { generateRandomId } = require('./random')

//represents a single message sent in a chat
const userSchema = Schema({
  _id: {
    type: String,
    default: generateRandomId()
  },
  created: {
    type: Date,
    default: Date.now
  },
  chatRooms: [String],
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
    callback(userMap)
  });
}
module.exports.getUserById = (id, callback) => {
  User.findById(id, callback)
}
module.exports.addUserToChatroom = (userId, chatroomId, callback) => {
  console.log('adding to chatroom');
  User.findById(userId, (err, user) => {
    if (err) console.log(err)
    else {
      const chatId = chatroomId

      user.chatRooms.push(chatId)
      user.save()

      callback(user)
    }
  })
}
