const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://renotify-cfa59.firebaseio.com"
});

const db = admin.firestore();

module.exports = {admin, db};