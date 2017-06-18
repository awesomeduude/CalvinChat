import React from 'react'
import PropTypes from 'prop-types'

const ChatHeader = ({roomId, chatName, usernames}) =>
  <header>
    <h1>Room Id: {roomId}</h1>
    <h2>{chatName}</h2>
    <h3>
      {usernames.map((username, i) => {
        //adds a comma after the userames
          const formatted = usernames.length - 1 === i ? username : `${username}, `
          return <span key={username}>{formatted}</span>

      })}
    </h3>
  </header>

ChatHeader.propTypes = {
    roomId: PropTypes.string,
    chatName: PropTypes.string,
    usernames: PropTypes.array
}
export default ChatHeader
