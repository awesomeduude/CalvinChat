import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Form from '../Form'
import './JoinChat.css';

class JoinChat extends Component {
  createUser = (e) => {
    e.preventDefault()
    const init = {
      method: 'POST',
      body: JSON.stringify({
        username: this.usernameInput.value
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    fetch('/users', init)
       .then(res => res.json())
       .then(user => {
         this.setState({user})
         this.joinChatroom(user._id)
       })
  }
  joinChatroom = (userId) => {
    const init = {
      method: 'PUT',
      body: JSON.stringify({
        chatroomId: this.idInput.value,
        userId
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    fetch('/chats', init)
      .then(res => res.json())
      .then(user => {
        console.log(user)
        //gets the most recently added chatroom
        const chatroomId = user.chatRooms[user.chatRooms.length-1]
        
        this.context.router.push(`/chatrooms/${chatroomId}`)
      })
  }
  render() {
    return (
      <div className="JoinChat">
        <h1>Join Chat</h1>
        <Form>
          <fieldset>
            <label htmlFor='username'>Username</label>
            <input id='username' type='text' placeholder='Enter a username'
              ref={(input) => { this.usernameInput = input }}
            />
          </fieldset>
          <fieldset>
            <label htmlFor='id'>Chat Id</label>
            <input id='id' type='text' placeholder='Enter a Chat Id'
              ref={(input) => { this.idInput = input }}
            />
          </fieldset>

          <button type='submit' onClick={this.createUser}>Join Chatroom</button>
        </Form>
      </div>
    )
  }
}

JoinChat.contextTypes = {
  router: PropTypes.object.isRequired
}

export default JoinChat;
