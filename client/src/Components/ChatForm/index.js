import React, { Component } from 'react';
import './ChatForm.css';

class ChatForm extends Component {
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
    console.log('user init', init);
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
        //redirect to chatroom id
      })
  }
  render() {
    return (
      <div className='ChatForm'>
        <form>
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
        </form>
      </div>
    )
  }
}
ChatForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default ChatForm;
