const {admin, db} = require('./admin');
const {AuthenticationError} = require('apollo-server-express')

exports.firebaseAuth = (context) => {
  let idToken;
  if(context.request.headers.authorization && context.request.headers.authorization.startsWith('Bearer ')){
    idToken = context.request.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No token found.')
    throw new AuthenticationError('Invalid token.');
  }
  admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
      context.request.user = decodedToken;
      return db.collection('users')
        .where('userId', '==', context.request.user.uid)
        .limit(1)
        .get();
    })
    // .then( data => {
    //   request.user.userName = data.docs[0].data().userName;
    //   return next();
    // })
    .catch((error) => {
      console.error('verify token error', error)
      throw new AuthenticationError('verify token error');
    });
};