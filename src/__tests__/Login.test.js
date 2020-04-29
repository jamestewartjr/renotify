import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Login from '../pages/Login';
import { MockedProvider } from "@apollo/react-testing";
import {LOGIN_USER} from '../api/mutations'
import { BrowserRouter as Router} from 'react-router-dom';


beforeEach(cleanup);

const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: { email: 'user1@email.com', password: '123456' }
    },
    result: {
      data: {
        user: {
          id: 1,
          email: 'user1@email.com',
          username: 'Douglas',
          createdAt: '2020-04-04T21:19:26.377Z'
        }
      }
    }
  },
  {
    request: {
      query: LOGIN_USER,
      variables: { email: 'user@email.com', password: '12345'}
    },
    error: new Error("User not found")
  }
]

describe('<Login />', () => {
  describe('Renders', () => {
    it('should render login title', () => {
      const {queryByTestId} = render(
        <MockedProvider mocks={[]}>
          <Router>
            <Login />
          </Router>
        </MockedProvider>
      );
      expect(queryByTestId('login-title')).toHaveTextContent('Welcome Back!');
    });
    it('should render login email label', () => {
      const {queryByTestId} = render(
        <MockedProvider mocks={[]}>
          <Router>
            <Login />
          </Router>
        </MockedProvider>
      );
      expect(queryByTestId('login-email')).toHaveTextContent('Email Address');
    });
    it('should render login password label', () => {
      const {queryByTestId} = render(
        <MockedProvider mocks={[]}>
          <Router>
            <Login />
          </Router>
        </MockedProvider>
      );
      expect(queryByTestId('login-password')).toHaveTextContent('Password');
    });
  });
});
