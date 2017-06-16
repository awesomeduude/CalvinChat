const express = require('express');
const router = express.Router();
const path = require('path')

router.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.sendFile(path.join(__dirname,'..','/client/build/index.html'))
  }
  return res.sendFile(path.join(__dirname, '/client/public/index.html'))
})

module.exports = router;
