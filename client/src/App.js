import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    users: {},
    chats: {}
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => {
        this.setState({ users })
      })
    fetch('/chats')
        .then(res => res.json())
        .then(chats => {
          console.log(chats)
          this.setState({ chats })
        })
  }
  render() {
    const { users, chats } = this.state
    return (
      <div className="App">
        <h1>Users</h1>

        {Object.keys(users).map(id =>
          <div key={id}>{users[id].username}</div>
        )}

        <h1>Chats</h1>
        {Object.keys(chats).map(id => {
          const usersInChat = chats[id].users
          return (
          <ul>
            {usersInChat.map(id =>
              <li key={id}>{users[id].username}</li>
            )}
          </ul>
          )
          }
        )}
      </div>
    );
  }
}

export default App;
