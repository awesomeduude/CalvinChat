import React, { Component } from 'react';
import './ChatRoom.css';

class ChatRoom extends Component {
  state = {
    userIds: [],
    chatName: '',
    messageIds: []
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
      })
  }
  render() {

    return (
      <div className='ChatRoom'>
          <h1>{this.props.params.id}</h1>
          <h2>{this.state.chatName}</h2>
          <ul>
            {this.state.userIds.map(id =>
              <li key={id}>{id}</li>
            )}
          </ul>
      </div>
    )
  }
}

export default ChatRoom;
