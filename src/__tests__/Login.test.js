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
  describe('Success', () => {
    it('should render initial state', () => {
      const {queryByTestId} = render(
        <Router>
          <MockedProvider mocks={[]}>
            <Login />
          </MockedProvider>
        </Router>
      );
      expect(queryByTestId('login')).toBeTruthy();

    });
    // it('renders the Login component', () => {
    //   const { queryByTestId } = render(
    //     <MockedProvider mocks={mocks}>
    //       <Login />
    //     </MockedProvider>
    //   );
    //   expect(queryByTestId('container')).toBeTruthy();
    // });
  });
});
