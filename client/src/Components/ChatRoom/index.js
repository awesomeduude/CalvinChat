import React, { Component } from 'react';
import './ChatRoom.css';

class ChatRoom extends Component {
  componentDidMount() {
    const { chatId } = this.props.params
  }
  render() {

    return (
      <div className='ChatRoom'>
          <h1>{this.props.params.id}</h1>
      </div>
    )
  }
}

export default ChatRoom;
