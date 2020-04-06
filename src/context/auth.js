import React, {useReducer, createContext} from 'react'
// import {admin} from 'firebase-admin'

const initialState = {user: null}

// need to check for expired tokens
// if(localStorage.getItem('JWTToken')) {
//   admin.auth().verifyIdToken(localStorage.getItem('JWTToken'))
//     .then((decodedIdToken) => {
//       if(decodedIdToken.exp * 1000 < new Date.now()){
//         localStorage.removeItem('JWTToken')
//       }
//       else {
//         initialState.user = decodedIdToken
//         return admin.auth().createSessionCookie(localStorage.getItem('JWTToken'));
//       }
//     })
//     .catch( err => {
//       throw new Error('Login in again')
//     })
// }

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {}
})

const authReducer = (state, action) => {
  switch(action.type){
  case 'LOGIN':
    return{
      ...state,
      user: action.payload
    }
  case 'LOGOUT':
    return{
      ...state,
      user: null
    }
  default:
    return state;
  }
}

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (userData) => {
    localStorage.setItem("JWTToken", userData.token)
    dispatch({ type: 'LOGIN', payload: userData })
  }

  const logout = () => {
    localStorage.removeItem("JWTToken")
    dispatch({ type: 'LOGOUT' })
  }

  return(
    <AuthContext.Provider
      value={{user: state.user, login, logout}}
      {...props}
    />
  )
}

export {AuthContext, AuthProvider}