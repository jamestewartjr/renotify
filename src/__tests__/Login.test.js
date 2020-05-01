import React from 'react';
import { render, fireEvent, cleanup, waitForElement } from '@testing-library/react';
import Login from '../pages/Login';
import { MockedProvider } from "@apollo/react-testing";
import {LOGIN_USER} from '../api/mutations'
import { BrowserRouter as Router, MemoryRouter} from 'react-router-dom';

// TEST
// error states
// validation
// useForm initial state
// mock Apollo login mutation
// mock loading initial state
// Register Link

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
  describe('Renders Successfully', () => {
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
  // describe('Login Successful', () => {
  //   it('should login onClick', async () => {
  //     const {queryByTestId} = render(
  //       <MockedProvider mocks={mocks} addTypename={false}>
  //         <Router>
  //           <Login />
  //         </Router>
  //       </MockedProvider>
  //     );
  //     fireEvent.click(queryByTestId('login-submit-action'));
  //     expect(queryByTestId('login-submit-action')).toBeTruthy();
  //     await act
  //   });
  // });
  // describe('Login Fail', () => {
  //   it('should login not Login on fail', async () => {
  //     const {queryByTestId} = render(
  //       <MockedProvider mocks={mocks} addTypename={false}>
  //         <Router>
  //           <Login />
  //         </Router>
  //       </MockedProvider>
  //     );
  //     fireEvent.click(queryByTestId('login-submit-action'));
  //     expect(queryByTestId('login-submit-action')).toBeFalsy();
  //     await act(0); // wait for response
  //   });
  // })
  /*
  it("redirects to registration page on Signup Click", async () => {
    const {queryByTestId} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/login']}>
          <Login />
        </MemoryRouter>
      </MockedProvider>
    );
    expect(queryByTestId('login-register-link')).toBeTruthy();
    fireEvent.click(queryByTestId('login-register-link'), { button: 0})
    const registerPage = await waitForElement(() => queryByTestId('register'))
    expect(queryByTestId('login-register-link')).toBeFalsy();
    expect(registerPage).toBeTruthy();
    expect(queryByTestId('register')).toBeInTheDocument();
  })
  */
});
