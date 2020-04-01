const {db} = require('../../util/admin') 
const firebase = require('firebase')
const {AuthenticationError} = require('apollo-server-express')
const firebaseConfig = require('../../config/serviceKey')
firebase.initializeApp(firebaseConfig);

const register = (_, args) => {
  let userId;
  const {registerInput:{username, email, password, confirmPassword}} = args;
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
      const userCredentials = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        username: username,
        createdAt: new Date().toISOString(),
        userId
      };
      db.doc(`/users/${userId}`).set(userCredentials)
      return {token, user:userCredentials} 
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
      let userData = firebase.auth().currentUser;
      let user = {
        email: userData.email,
        id: userData.uid
      }
      return {token, user}
    })
    .catch(error => {
      console.error('Error: ', error);
      throw new AuthenticationError('Wrong credentials.');
    })
};

const logout = () =>{
  return firebase.auth().signOut();
}

module.exports = {
  Mutation: {
    login,
    register
  }
}