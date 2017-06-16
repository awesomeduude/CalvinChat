import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './Components/App';
import ChatForm from './Components/ChatForm';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='chat' component={ChatForm} />
    </Route>

  </Router>
), document.getElementById('root'))
registerServiceWorker();
