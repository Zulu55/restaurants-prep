import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAhOhwafSiaIGeGxsMooqPBMO8u041d4gc",
    authDomain: "restaurants-prep.firebaseapp.com",
    projectId: "restaurants-prep",
    storageBucket: "restaurants-prep.appspot.com",
    messagingSenderId: "960479336113",
    appId: "1:960479336113:web:8b9fc43fd457db8859b490"
}
    
export const firebaseApp = firebase.initializeApp(firebaseConfig)