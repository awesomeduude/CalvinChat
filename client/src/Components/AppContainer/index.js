import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import PropTypes from 'prop-types'

import App from '../App';
import CreateChat from '../CreateChat';
import ChatRoom from '../ChatRoom'
import Homepage from '../Homepage'
import JoinChat from '../JoinChat'

class AppContainer extends Component {
  getChildContext() {
      return {
        router: browserHistory
      }
  }
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRedirect to='/home' />
          <Route path='home' component={Homepage} />
          <Route path='create' component={CreateChat} />
          <Route path='join' component={JoinChat}/>
          <Route path='chatrooms/:id' component={ChatRoom} />

        </Route>
      </Router>
    )
  }
}
AppContainer.childContextTypes = {
  router: PropTypes.object.isRequired
}
export default AppContainer;
