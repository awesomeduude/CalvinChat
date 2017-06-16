import React, { Component } from 'react';
import io from 'socket.io-client'
import './ChatRoom.css';
const socket = io()

class ChatRoom extends Component {

  state = {
    userIds: [],
    chatName: '',
    messageIds: [],
    messages: []
  }
  constructor(props) {
    super(props)
    socket.on('receive message', (payload) => {
      console.log('received message', payload)
      this.updateChatFromSockets(payload);
   })
  }
  updateChatFromSockets = (payload) => {
    console.log('messages before', this.state.messages)
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
    const { id } = this.props.params
    fetch(`/chats/${id}`)
      .then(res => res.json())
      .then(chat => {
        const { users, chatName, messages } = chat
        this.setState({
          userIds: users,
          messageIds: messages,
          chatName

        })
        socket.emit('room', {room: this.props.chat._id});
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
   const { messages } = this.state
   console.log('render messages', messages)

    return (
      <div className='ChatRoom'>
          <h1>{this.props.params.id}</h1>
          <h2>{this.state.chatName}</h2>
          <ul>
            {this.state.userIds.map(id =>
              <li key={id}>{id}</li>
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

export default ChatRoom;
