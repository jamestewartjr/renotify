import React, { useEffect }  from 'react';
import './styles/index.css';
import {createBrowserHistory} from 'history'
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context'
import {createHttpLink} from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Router, Route, Switch} from 'react-router-dom';
import ReactGA from 'react-ga';
import themeObj from './styles/theme.json';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Notices from './pages/Notices'
import {AuthProvider } from './context/auth'
import AuthRoute from './components/AuthRoute'
import {Header} from './components/layout/Header'

const history = createBrowserHistory()
// ReactGA.initialize(process.env.GA_TRACKING);
ReactGA.initialize('229806316');

history.listen((location, action) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname + location.search);
  console.log(location.pathname)
});

const httpLink = createHttpLink({
  uri: 'http://localhost:3100/'
});

const authLink = setContext( () => {
  const token = localStorage.getItem('JWTToken')
  return ({
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  })
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    dataIdFromObject: o => (o.id ? `${o.__typename}-${o.id}`: null),  })
});

const theme = createMuiTheme(themeObj);

const App = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <AuthProvider>
      <Router history={history}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Header />
            <Container data-testid="app" className="App">
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <AuthRoute exact path='/notices' component={Notices}/>
              </Switch>
            </Container>
          </ThemeProvider>
        </ApolloProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
