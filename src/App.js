import React from 'react';
import './styles/index.css';
import {Header} from './components/layout/Header'
import {Content} from './components/layout/Content'
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

function App() {
  return (
    <ApolloProvider client={client}>
      <main data-testid="app" className="App">
        <Header />
        <Content />
      </main>
    </ApolloProvider>
  );
}

export default App;
