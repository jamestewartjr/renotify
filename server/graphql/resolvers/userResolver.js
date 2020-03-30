const {admin, db} = require('../../util/admin') 
const firebase = require('firebase')
const {AuthenticationError} = require('apollo-server-express')
const firebaseConfig = require('../../config/serviceKey')
firebase.initializeApp(firebaseConfig);

const register = (_, args) => {
  let tokenValue,userId;
  const {username, email, password, confirmPassword} = args;

  return db.doc(`/users/${username}`).get()
    .then(doc => {
      if(doc.exists){
        throw new AuthenticationError('This username is already in use.');
      }
      else { 
        return firebase.auth().createUserWithEmailAndPassword(email, password)
      }
    })
    .catch(error => {
      console.error('Error: ', error)
      throw new AuthenticationError(error)
    })
    .then( data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then( (token) => {
      console.log('user token: ', token)
      tokenValue = token;
      const userCredentials = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        username: username,
        createdAt: new Date().toISOString(),
        userId
      };
      let cred = db.doc(`/users/${username}`).set(userCredentials)
      return {token, cred}
    })
    .catch(error => {
      console.error('Error: ', error)
      if(error.code === 'auth/email-already-in-use'){
        throw new AuthenticationError('Email is already in use.')
      }else {
        throw new AuthenticationError("Something went wrong.")
      }
    });
};

const login = (_, args) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(args.email, args.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      console.log('login token: ', token)
      //let user = getRegisteredUser
      return token
    })
    .catch(error => {
      console.error('Error: ', error);
      throw new AuthenticationError('Wrong credentials.');
    })
};

module.exports = {
  Mutation: {
    login,
    register
  }
}