import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const httpLink = createHttpLink({
  uri: 'http://localhost:3100/'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    dataIdFromObject: o => (o.id ? `${o.__typename}-${o.id}`: null),
  })
});

if (process.env.NODE_ENV !== 'production') {
  let axe = require('react-axe');
  axe(
    React, 
    ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>, 
      document.getElementById('root')), 
    1000
  );
} else {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>, 
    document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();

serviceWorker.unregister();