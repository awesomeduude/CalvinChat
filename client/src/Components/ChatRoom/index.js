import React, { Component } from 'react';
import PropTypes from 'prop-types'
import io from 'socket.io-client'
import fecha from 'fecha'
import './ChatRoom.css';

const socket = io()

class ChatRoom extends Component {

  constructor(props) {
    super(props)
      this.state = {
        chatName: '',
        messages: [],
        usernames: []
      }
    socket.on('receive message', (payload) => {
      this.updateChatFromSockets(payload);
    })
    socket.on('joined chat', (payload) => {
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

      const newState = {
        messages: messages.concat([payload])
      }

      return newState
    })
  }
  componentDidMount() {
    if (!this.props.user.username) {
      this.context.router.push('/home')
      return
    }
    const { id } = this.props.params
    fetch(`/chats/${id}`)
      .then(res => res.json())
      .then(chat => {

        const { chatName, messages, users } = chat

        this.setState({
          messages: messages,
          usernames: users,
          chatName,

        })
        socket.emit('room', {room: this.props.chat._id});
      })
    socket.emit('joining chat', {
      username: this.props.user.username,
      room: this.props.chat._id,
    })
  }
  componentWillReceiveProps(nextProps) {
    socket.emit('room', {room: this.props.chat._id})
  }
  componentWillUnmount() {
    socket.emit('leave room', {
      room: this.props.chat._id
    })

  }
  sendMessage = (e) => {
    e.preventDefault()
    const message = {
      content: this.messageInput.value,
      from: this.props.user.username,
      created: Date.now(),
      room: this.props.chat._id,

    }

    this.setState((prevState) => {
      const { messages } = prevState
      const newState = {
        messages: messages.concat([message])
      }

      return newState
    })
    socket.emit('send message', message)
  }
  render() {
    const { messages, chatName, usernames } = this.state

    return (
      <div className='ChatRoom'>
          <h1>Room Id: {this.props.params.id}</h1>
          <h2>{chatName}</h2>
          <h3>

            {usernames.map((username, i) => {
              //adds a comma after the userames
              const formatted = usernames.length - 1 === i ? username : username +', '
              return <span key={username}>{formatted}</span>

            })}

          </h3>
          <div className="messages">
            {messages.map(message =>{

              const date = fecha.format(new Date(message.created), 'MM-DD-YYYY HH:mm A')
              let style = {}
              if (message.from == this.props.user.username) {
                style['textAlign'] = 'right'
              }
              return (
                <div style={style} key={Math.random()} className="message">
                  <p>{message.from}</p>
                  <p>{message.content}</p>
                  <p>{date}</p>
                </div>
              )
            })}
            <form onSubmit={this.sendMessage}>
              <input type="text" ref={(input) => this.messageInput = input}/>
              <button type='submit'>Send</button>
            </form>
          </div>

      </div>
    )
  }
}
ChatRoom.contextTypes = {
  router: PropTypes.object.isRequired
}
export default ChatRoom;
