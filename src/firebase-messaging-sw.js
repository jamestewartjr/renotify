import {messaging} from '../utils/firebaseMessaging'


messaging.setBackgroundMessageHandler(function(payload) {
  console.log('fb-messaging payload', payload)
  // const promiseChain = clients
  //   .matchAll({
  //     type: "window",
  //     includeUncontrolled: true
  //   })
  //   .then(windowClients => {
  //     for (let i = 0; i < windowClients.length; i++) {
  //       const windowClient = windowClients[i];
  //       windowClient.postMessage(payload);
  //     }
  //   })
  //   .then(() => {
  //     return registration.showNotification("my notification title");
  //   });
  // return promiseChain;
});

// self.addEventListener('notificationclick', function(event) {
//   // do what you want
//   // ...
// });