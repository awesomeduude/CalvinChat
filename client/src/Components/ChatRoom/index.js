import React, { Component } from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'
import './ChatRoom.css'

const socket = io()

class ChatRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chatName: '',
            messages: [],
            usernames: [],
            messageInput: ''
        }
        socket.on('receive message', addMessageToState)
        socket.on('joined chat', updateUsers)
    }
    updateUsers = user => {
        this.setState(({ usernames }) => {
            return {usernames: usernames.concat([user.username])}
        })
    }
    addMessageToState = message => {
        this.setState(({ messages }) => {
            return {messages: messages.concat([message])}
        })
    }
    componentDidMount() {
        if (!user.username) {
            return this.context.router.push('/home')
        }
        const { user, params, chat } = this.props
        const { id } = params

        fetch(`/chats/${id}`)
          .then(res => res.json())
          .then(({ chatName, messages, users, _id }) => {
              this.setState({
                  usernames: users,
                  messages,
                  chatName
              })
              socket.emit('room', {room: _id})
          })

        socket.emit('joining chat', {
            username: user.username,
            room: chat._id
        })
    }
    componentWillReceiveProps() {
        socket.emit('room', {room: this.props.chat._id})
    }
    componentWillUnmount() {
        socket.emit('leave room', {room: this.props.chat._id})
    }
    sendMessage = (e) => {
        e.preventDefault()
        const { user, chat } = this.props
        const message = {
            content: this.state.messageInput,
            from: user.username,
            created: Date.now(),
            room: chat._id
        }

        addMessageToState(message)
        socket.emit('send message', message)
        this.setState({messageInput: ''})
    }
    updateInput = (e) => {
        this.setState({messageInput: e.target.value})
    }
    render() {
        const { messages, chatName, usernames, messageInput } = this.state
        const { params, user } = this.props
        return (
          <div className='ChatRoom'>
              <ChatHeader
                roomId={params.id}
                chatName={chatName}
                usernames={usernames}
              />
              <ChatWindow
                messages={messages}
                user={user}
                messageInput={messageInput}
                updateInput={this.updateInput}
                sendMessage={this.sendMessage}
                />
          </div>
        )
    }
}
ChatRoom.contextTypes = {router: PropTypes.object.isRequired}

export default ChatRoom
