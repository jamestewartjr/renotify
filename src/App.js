import React from 'react';
import './styles/index.css';
import {Header} from './components/layout/Header'
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import themeObj from './styles/theme.json';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Notices from './pages/Notices'
import Container from '@material-ui/core/Container';
import {AuthProvider } from './context/auth'
import AuthRoute from './components/AuthRoute'

const httpLink = createHttpLink({
  uri: 'http://localhost:3100/'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    dataIdFromObject: o => (o.id ? `${o.__typename}-${o.id}`: null),
  })
});

const theme = createMuiTheme(themeObj);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Header />
            <Container data-testid="app" className="App">
              <Route exact path='/' component={Home}/>
              <AuthRoute exact path='/login' component={Login}/>
              <AuthRoute exact path='/register' component={Register}/>
              <Route exact path='/notices' component={Notices}/>
            </Container>
          </ThemeProvider>
        </ApolloProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
