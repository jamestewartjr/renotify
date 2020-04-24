const firebase = require('firebase/app')
require('firebase/messaging');

const firebaseConfig = require('../config/serviceKey')

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.usePublicVapidKey('BMp1JcoxuB4adrdzmn5obBNZM1HHEmAy6KHrWAfVOWLZ_4Xo17IAccVdVnqz6fUQDzyK7AS2KdavhchhytPF4yM')

export { messaging };