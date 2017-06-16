import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import PropTypes from 'prop-types'

import App from '../App';
import ChatForm from '../ChatForm';
import ChatRoom from '../ChatRoom'
import Homepage from '../Homepage'

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
          <Route path='chat' component={ChatForm} />
          <Route path="chatrooms/:id" component={ChatRoom} />
        </Route>
      </Router>
    )
  }
}
AppContainer.childContextTypes = {
  router: PropTypes.object.isRequired
}
export default AppContainer;
