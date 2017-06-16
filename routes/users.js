const express = require('express')
const router = express.Router()
const User = require('../models/user')
/* GET users listing. */
router.get('/',(req, res) => {
  User.getAllUsers((allUsers) => {
    return res.json(allUsers)
  })
})

router.post('/', (req,res) => {
  //create a new user
  const { username } = req.body
  console.log('posted to users with username', username)
  console.log('req body', req.body);
  User.createNewUser(username, (newUser) => {
    const { _id, username } = newUser

    return res.json(newUser)
  })
})
module.exports = router
