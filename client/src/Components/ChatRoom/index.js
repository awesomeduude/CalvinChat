import React, { Component } from 'react';
import PropTypes from 'prop-types'
import io from 'socket.io-client'
import './ChatRoom.css';
const socket = io()

class ChatRoom extends Component {

  state = {
    userIds: [],
    chatName: '',
    messageIds: [],
    messages: [],
    usernames: []
  }
  constructor(props) {
    super(props)
    socket.on('receive message', (payload) => {
      this.updateChatFromSockets(payload);
    })
    socket.on('joined chat', (payload) => {
      console.log('joined chat', payload)
      this.updateUsersFromSockets(payload)
    })
  }
  updateUsersFromSockets = (payload) => {
    this.setState((prevState) => {
      const { usernames } = prevState
      const newUsername = payload.username
      return {
        usernames: usernames.concat([newUsername])
      }
    })
  }
  updateChatFromSockets = (payload) => {

    this.setState((prevState) => {
      const { messages } = prevState
      const newMessage = payload.message

      const newState = {
        messages: messages.concat([newMessage])
      }

      return newState
    })
  }
  componentDidMount() {
    if (!this.props.user.username) {
      console.log('not logged in')
      this.context.router.push('/home')
      return
    }
    const { id } = this.props.params
    fetch(`/chats/${id}`)
      .then(res => res.json())
      .then(chat => {

        console.log('user',this.props.user)
        const { users, chatName, messages } = chat
        this.setState({
          userIds: users,
          messageIds: messages,
          chatName

        })
        socket.emit('room', {room: this.props.chat._id});
      })
    socket.emit('joining chat', {
      username: this.props.user.username,
      room: this.props.chat._id,
    })
  }
  componentWillUnmount() {
    socket.emit('leave room', {
      room: this.props.chat._id
    })
  }
  sendMessage = (e) => {
    e.preventDefault()
    const message = this.messageInput.value

    this.setState((prevState) => {
      const { messages } = prevState
      const newState = {
        messages: messages.concat([message])
      }

      return newState
    })
    socket.emit('send message', {
      room: this.props.chat._id,
      from: this.props.user.username,
      message
    })
  }
  render() {
    //const { messages } = this.state

    return (
      <div className='ChatRoom'>
          <h1>{this.props.params.id}</h1>
          <h2>{this.state.chatName}</h2>
          <ul>
            {this.state.usernames.map(username =>
              <li key={username}>{username}</li>
            )}
          </ul>
          <form onSubmit={this.sendMessage}>
            <input type="text" ref={(input) => this.messageInput = input}/>
            <button type='submit'>Send</button>
          </form>
          {this.state.messages.map(message =>
            <p key={Math.random()}>{message}</p>
          )}
      </div>
    )
  }
}
ChatRoom.contextTypes = {
  router: PropTypes.object.isRequired
}
export default ChatRoom;
