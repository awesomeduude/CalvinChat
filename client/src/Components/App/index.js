import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    user: {},
    chat: {}
  }
  setUser = (user) => {
    this.setState({user})
  }
  setChat = (chat) => {
    this.setState({chat})
  }
  render() {
    const { user, chat } = this.state
    return (
      <main className='App'>
        {React.cloneElement(this.props.children, {
          testProp: 'asdfasdfasdf',
          setUser: this.setUser,
          setChat: this.setChat,
          user, chat, })
        }
      </main>
    )
  }
}

export default App;
