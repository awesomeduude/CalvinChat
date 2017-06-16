const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

//represents a chatroom
const chatSchema = Schema({
  chatName: String,
  users: [ObjectId],
  messages: [ObjectId],
  created: {
    type: Date,
    default: Date.now
  },
  createdBy: ObjectId,
  updated: {
    type: Date,
    default: Date.now
  },

})

const Chat = module.exports = mongoose.model('Chat', chatSchema)

module.exports.createNewChat = (userId, chatName, callback) => {
  const id = mongoose.Types.ObjectId(userId);
  const newChat = new Chat({
    users: [id],
    messages: [],
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
