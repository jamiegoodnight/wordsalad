import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyB47qK3fC8VzDqIps89YeyVMlJ_Nc0kGE4",
    authDomain: "hilaire-esl-dictionary.firebaseapp.com",
    projectId: "hilaire-esl-dictionary",
    storageBucket: "hilaire-esl-dictionary.appspot.com",
    messagingSenderId: "676102347220",
    appId: "1:676102347220:web:dc45513410d69792dc5e41",
    measurementId: "G-P0RLXL1Q0S"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;