import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCcZlFNuPH7rOgD4oF8B9u1LmRe5mLNVoo',
  authDomain: 'recettes-app-e76dc.firebaseapp.com',
  databaseURL: 'https://recettes-app-e76dc.firebaseio.com'
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base


// Code des règles de Firebase


// {
//   "rules": {
//     ".read": true,
//     ".write": "!data.exists()",
//     "$box" : {
//       ".write": "auth != null && (!data.exists() || data.child('chef').val() === auth.uid)",
//       ".read": true
//     }
//   }