import axios from "axios";
import firebase from "firebase/app";
import "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyCgE4iQJUFyVCuB_BVST-wwbzxgSwG0vZc",
  authDomain: "starthack-796b2.firebaseapp.com",
  projectId: "starthack-796b2",
  storageBucket: "starthack-796b2.appspot.com",
  messagingSenderId: "649713416037",
  appId: "1:649713416037:web:ae2f1fc55d56de1321538c",
  measurementId: "G-D1KGJJCMRL",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
  return messaging
    .getToken({
      vapidKey:
        "BKbe0GFVhnvWtMstQmIL0th5kyd2cF7Ezua06l2ga0163TIOa87Z9i844R-TOgMbwA7wHM8RHnD51l1U051bCqY",
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        return currentToken;
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .then((currentToken) => {
      const res = axios.post("/room-token", { token: currentToken });
      console.log("result", res);
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
