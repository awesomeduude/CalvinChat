import React from 'react'
import PropTypes from 'prop-types'
import fecha from 'fecha'

const ChatWindow = ({messages, user, messageInput, updateInput, sendMessage }) =>
  <div className='messages'>
    {messages.map(message =>{
        const date = fecha.format(new Date(message.created), 'MM-DD-YYYY HH:mm A')
        const style = {}

        if (message.from === user.username) {
            style['textAlign'] = 'right'
        }
        return (
          <div style={style} key={Math.random()} className='message'>
            <p>{message.from}</p>
            <p>{message.content}</p>
            <p>{date}</p>
          </div>
        )
    })}

    <form onSubmit={sendMessage}>
      <input type='text' onChange={updateInput} value={messageInput}/>
      <button type='submit'>Send</button>
    </form>
  </div>

ChatWindow.propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    messageInput: PropTypes.string.isRequired,
    updateInput: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired
}
export default ChatWindow
