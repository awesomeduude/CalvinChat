import React, { Component } from 'react';
import { Link } from 'react-router'
import './Homepage.css';

const Homepage = () =>
  <div className='Homepage'>
    <h1>Instachat</h1>
    <h3>Instantly create a private chatroom!</h3>
    <div className="link">
      <Link to='/chat'>
        <button>Create a Chatroom</button>
        </Link>
    </div>
  </div>
export default Homepage;
