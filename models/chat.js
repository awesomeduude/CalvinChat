const mongoose = require('mongoose')
const shortid = require('shortid')
const { Schema } = mongoose

//represents a chatroom
const chatSchema = Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  chatName: String,
  users: [String],
  messages: [{
    from: String,
    created: Date,
    room: String,
    content: String
  }],
  created: {
    type: Date,
    default: Date.now
  },
  createdBy: String,
  updated: {
    type: Date,
    default: Date.now
  },

})

const Chat = module.exports = mongoose.model('Chat', chatSchema)

module.exports.createNewChat = (userId, chatName, callback) => {
  const id = userId
  const newChat = new Chat({
    users: [id],
    messages:[],
    created: Date.now(),
    createdBy: id,
    chatName
  })
  newChat.save((err, chatroom) => {
    if (err) console.log(err)
    else callback(chatroom)
  })
}
module.exports.getAllChats = (callback) => {
  Chat.find({}, (err, chats) => {
    let chatMap = {}

    chats.forEach((chat) => {
      chatMap[chat._id] = chat;
    });
    console.log(chatMap);
    callback(chatMap)
  });
}
module.exports.getChatById  = (id, callback) => {
  Chat.findById(id, callback)
}
