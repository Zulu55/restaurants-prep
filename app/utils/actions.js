import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

import { fileToBlob } from './utils'

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

export const uploadImage = async (image, path, name) => {
    const result = { statusResponse: false, error: null, url: null }
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)
    await ref.put(blob)

    try {
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = error    
    }

    return result
}

export const updateProfile = async (data) => {
    const result = { statusResponse: false, error: null }
 
    try {
        await firebase.auth().currentUser.updateProfile(data)
        result.statusResponse = true    
    } catch (error) {
        result.error = error    
    }

    return result
}