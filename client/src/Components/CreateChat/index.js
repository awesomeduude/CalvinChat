import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Form from '../Form'
import './CreateChat.css';

class CreateChat extends Component {
  state = {user: {}}
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
         this.createChatroom()
       })

  }
  createChatroom = () => {
    const init = {
      method: 'POST',
      body: JSON.stringify({
        userId: this.state.user._id,
        chatName: this.chatNameInput.value
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    console.log('chat init', init);
    fetch('/chats', init)
      .then(res => res.json())
      .then(chatroom => {
        if (chatroom.users[0]) {
          this.context.router.push(`/chatrooms/${chatroom._id}`)
        }

      })
  }
  render() {
    return (
      <div className='CreateChat'>
        <h1>Create a New ChatRoom</h1>
        <Form>
          <fieldset>
            <label htmlFor='username'>Username</label>
            <input id='username' type='text' placeholder='Enter a username'
              ref={(input) => { this.usernameInput = input }}
            />
          </fieldset>
          <fieldset>
            <label htmlFor='roomName'>Chat Name</label>
            <input id='roomName' type='text' placeholder='Enter a name for this chatroom'
             ref={(input) => { this.chatNameInput = input }}
             />
          </fieldset>

          <button type='submit' onClick={this.createUser}>Create Chatroom</button>
        </Form>
      </div>
    )
  }
}
CreateChat.contextTypes = {
  router: PropTypes.object.isRequired
}
export default CreateChat;
