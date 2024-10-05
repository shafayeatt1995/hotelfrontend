importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCCy02-gYWvAkYGVDxHoneJNI5iC904m9M",
  authDomain: "cholozai-423819.firebaseapp.com",
  projectId: "cholozai-423819",
  storageBucket: "cholozai-423819.appspot.com",
  messagingSenderId: "328972152673",
  appId: "1:328972152673:web:043a75aab4f2a002261f20",
  measurementId: "G-GDBWZXY0BG",
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
