import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {users:{}}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => {
        this.setState({ users })
      })
  }
  render() {
    const { users } = this.state
    return (
      <div className="App">
        <h1>Users</h1>

        {Object.keys(users).map(id =>
          <div key={id}>{users[id].username}</div>
        )}
      </div>
    );
  }
}

export default App;
