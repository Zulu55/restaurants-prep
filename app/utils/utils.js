import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export const loadImageFromGallery = async (array) => {
    let response = { status: false, image: "" }
    const resultPersissions = await Permissions.askAsync(Permissions.CAMERA)
    
    if (resultPersissions.status === "denied") {
      Alert.alert("Debes darle permiso a las imágenes")
      return
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: array
    })
  
    if (result.cancelled) {
      return
    }
  
    response = { status: true, image: result.uri }
    return response  
}

export const fileToBlob = async (path) => {
    const file = await fetch(path)
    const blob = await file.blob()
    return blob
}
  
  