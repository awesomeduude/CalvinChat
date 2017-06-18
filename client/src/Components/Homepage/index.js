import React from 'react'
import { Link } from 'react-router'
import './Homepage.css'

const Homepage = () =>
  <div className='Homepage'>
    <h1>Instachat</h1>
    <h3>Instantly create a private chatroom!</h3>
    <nav>
      <div className='link'>
        <Link to='/create'>
          <button>Create a Chatroom</button>
        </Link>
      </div>
      <div className='link'>
        <Link to='/join'>
          <button>Join a Chatroom</button>
        </Link>
      </div>
    </nav>
  </div>
export default Homepage
