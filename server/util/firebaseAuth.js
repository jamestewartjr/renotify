const {admin, db} = require('./admin');
const {AuthenticationError} = require('apollo-server-express')

exports.firebaseAuth = (context) => {
  let idToken;
  if(context.req.headers.authorization && context.req.headers.authorization.startsWith('Bearer ')){
    idToken = context.req.headers.authorization.split('Bearer ')[1];
    return admin.auth().verifyIdToken(idToken)
      .then(decodedToken => {
        return db.collection('users')
          .where('userId', '==', decodedToken.user_id)
          .limit(1)
          .get();
      })
      .then( data => {
        return data.docs[0].data();
      })
      .catch((error) => {
        console.error('Verify token error', error)
        throw new AuthenticationError('Authentication token error.');
      });
  } else {
    throw new AuthenticationError('Authorization header needed.');
  }
};