import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
}

export const registerUser = async(email, password) =>
{
    const result = { statusResponse: false, error: null }
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        result.statusResponse = true
    } catch {
        result.error = "Este correo ya ha sido registrado."
    }
    return result
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const closeSession = () => {
    firebase.auth().signOut()
}

export const loginWithEmailAndPassword = async (email, password) => {
    const result = { statusResponse: false, error: null }
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        result.statusResponse = true
    } catch {
        result.error = "Usuario o contraseña no válidos."
    }
    return result
}
