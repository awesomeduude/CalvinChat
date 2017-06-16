const express = require('express')
const router = express.Router()
const Chat = require('../models/chat')
const User = require('../models/user')

router.get('/',(req, res) => {
  Chat.getAllChats((allChats) => {
    return res.json(allChats)
  })
})
router.get('/:id', (req, res) => {
  const id = req.params.id
  Chat.getChatById(id, (err, chat) => {
    if (err) res.status(404)
    else {
      return res.json(chat)
    }
  })
})
router.post('/', (req,res) => {
  const { userId, chatName } = req.body

  Chat.createNewChat(userId, chatName, (newChatroom) => {
    const { _id, createdBy } = newChatroom

    return res.json(newChatroom)
    //handle side effects like adding user to chatroom
  })
})
//add user to chat
router.put('/', (req,res) => {
  const { userId, chatroomId } = req.body
  Chat.getChatById(chatroomId, (err, chatroom) => {
    if (err) console.log(err);
    else {
      chatroom.users.push(userId)
      chatroom.save()
    }
  })
  User.addUserToChatroom(userId, chatroomId, (user) => {
    return res.json(user)
  })

})
module.exports = router
