import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {

    return (
      <main className='App'>
        <h1>Instachat</h1>
        <h3>Instantly create a private chatroom!</h3>
        {this.props.children}
      </main>
    )
  }
}

export default App;
