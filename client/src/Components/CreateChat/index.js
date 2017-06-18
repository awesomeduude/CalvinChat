import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from '../Form'
import './CreateChat.css'
import { headers } from '../../utils'

class CreateChat extends Component {

    createUser = e => {
        e.preventDefault()
        const init = {
            method: 'POST',
            body: JSON.stringify({username: this.usernameInput.value}),
            headers
        }

        fetch('/users', init)
           .then(res => res.json())
           .then(user => {
               this.props.setUser(user)
               this.createChatroom()
           })

    }
    createChatroom = () => {
        const { setChat, user } = this.props
        const init = {
            method: 'POST',
            body: JSON.stringify({
                userId: user._id,
                chatName: this.chatNameInput.value
            }),
            headers
        }

        fetch('/chats', init)
          .then(res => res.json())
          .then(chatroom => {
              if (chatroom.users[0]) {
                  setChat(chatroom)
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
                  ref={(input) => {
                      this.usernameInput = input
                  }}
                />
              </fieldset>
              <fieldset>
                <label htmlFor='roomName'>Chat Name</label>
                <input id='roomName' type='text' placeholder='Enter a name for this chatroom'
                 ref={(input) => {
                     this.chatNameInput = input
                 }}
                 />
              </fieldset>

              <button type='submit' onClick={this.createUser}>Create Chatroom</button>
            </Form>
          </div>
        )
    }
}
CreateChat.contextTypes = {router: PropTypes.object.isRequired}

CreateChat.propTypes = {
  setUser: PropTypes.func.isRequired,
  setChat: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
export default CreateChat
