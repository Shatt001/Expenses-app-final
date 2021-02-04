import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAtHjI4pb0ZXn1mwz4m-56r-5ZNwjiGXvs",
  authDomain: "expensify-app-2d7d3.firebaseapp.com",
  databaseURL: "https://expensify-app-2d7d3.firebaseio.com",
  projectId: "expensify-app-2d7d3",
  storageBucket: "expensify-app-2d7d3.appspot.com",
  messagingSenderId: "1025859985326",
  appId: "1:1025859985326:web:e24c1aba6fc738b460323f",
  measurementId: "G-2CQ12SJMWX"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }
