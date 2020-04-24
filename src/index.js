import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
  let axe = require('react-axe');
  axe(
    React, 
    ReactDOM.render(
      <App />, 
      document.getElementById('root')), 
    1000
  );
} else {
  ReactDOM.render(
    <App />, 
    document.getElementById('root')
  );
}

// serviceWorker.register();
// serviceWorker.register(`/firebase-messaging-sw.js`)
serviceWorker.unregister();