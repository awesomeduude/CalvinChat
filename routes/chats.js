const express = require('express')
const router = express.Router()
const Chat = require('../models/chat')
const User = require('../models/user')

module.exports = (io) => {
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
        User.getAllUsers(userMap => {
          let usernames = []

          chat.users.forEach((userId) => {

            usernames.push(userMap[userId].username)
          });
          
          let newChat = Object.assign(chat.toObject(), {users: usernames})


          return res.json(newChat)
        })
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
    User.addUserToChatroom(userId, chatroomId, (user) => {
      //return res.json(user)
    })
    Chat.getChatById(chatroomId, (err, chatroom) => {
      if (err) console.log(err);
      else {
        chatroom.users.push(userId)
        chatroom.save()
        return res.json(chatroom)
      }
    })

  })
  io.on("connection", (socket) => {
    console.log('user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    })
    socket.on('room', (data) => {

      socket.join(data.room)
    })
    socket.on('leave room', (data) => {

      socket.leave(data.room)
    })
    socket.on('send message', (data) => {
      //add message to db
      socket.broadcast.to(data.room).emit('receive message', data)

      Chat.getChatById(data.room, (err, chatroom) => {
        if (err) console.log(err);
        else {
          chatroom.messages.push(data)
          chatroom.save()
        }

      })
    })
    socket.on('joining chat', (data) => {
      //add to db
      console.log('joining chat', data);
      socket.broadcast.to(data.room).emit('joined chat', data)
    })

  });

  return router
}
