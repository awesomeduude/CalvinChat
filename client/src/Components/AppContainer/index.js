import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'
import PropTypes from 'prop-types'

import App from '../App';
import ChatForm from '../ChatForm';
import ChatRoom from '../ChatRoom'

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
