const express = require('express')
const router = express.Router()
const Chat = require('../models/chat')
const User = require('../models/user')

router.get('/',(req, res) => {
  Chat.getAllChats((allChats) => {
    return res.json(allChats)
  })
})
router.post('/', (req,res) => {
  const { userId, chatName } = req.body

  Chat.createNewChat(userId, chatName, (newChatroom) => {
    const { _id, createdBy } = newChatroom
    console.log('new chatroom', newChatroom);
  
    return res.json(newChatroom)
    //handle side effects like adding user to chatroom
  })
})
module.exports = router
