import React, { useState } from 'react'
import CountryPicker from 'react-native-country-picker-modal'
import { StyleSheet, Text, View, Alert, Dimensions, ScrollView } from 'react-native'
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements'
import { map, size, filter } from 'lodash'

import { loadImageFromGallery } from '../../utils/utils'

const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
    const { toastRef, setLoading, navigation } = props

    const [formData, setFormData] = useState(defaultFormValues())
    const [formErrors, setFormErrors] = useState(defaultFormValues())
    const [imagesSelected, setImagesSelected] = useState([]);

    const addRestaurant = () => {
        console.log(formData)
        console.log(formErrors)
        console.log(imagesSelected)
    }

    return (
        <ScrollView style={styles.viewContainer}>
            <ImageRestaurant imagenRestaurant={imagesSelected[0]} />
            <FormAdd
                formData={formData}
                formErrors={formErrors}
                setFormData={setFormData}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
        </ScrollView>
    )
}

function FormAdd(props) {
    const { formData, formErrors, setFormData } = props

    const onChange = (e, type) => {
        setFormData({ ...formData, [type] : e.nativeEvent.text })
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del restaurante..."
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name")}
                defaultValue={formData.name}
                errorMessage={formErrors.name}
            />
            <Input
                placeholder="Dirección del restaurante..."
                defaultValue={formData.address}
                onChange={(e) => onChange(e, "address")}
                defaultValue={formData.address}
                errorMessage={formErrors.address}
            />
            <View style={styles.phonView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.countryPicker}
                    countryCode={formData.country}
                    onSelect={(country) => {
                        setFormData({ 
                            ...formData, 
                            "country": country.cca2, 
                            "callingCode": country.callingCode[0] 
                        })
                    }}
                />
                <Input
                    placeholder="WhatsApp del restaurante..."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e, "phone")}
                    defaultValue={formData.phone}
                    errorMessage={formErrors.phone}
                />
            </View>
            <Input
                placeholder="Descripción del restaurante..."
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.description}
                onChange={(e) => onChange(e, "description")}
                defaultValue={formData.description}
                errorMessage={formErrors.description}
            />
        </View>
    )
}

function UploadImage(props) {
    const { toastRef, imagesSelected, setImagesSelected } = props;
  
    const imageSelect = async () => {
        const response = await loadImageFromGallery([4, 3])
        if (!response.status) {
            toastRef.current.show("No has seleccionado ninguna imagen.", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image]);
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas seguro de que quieres eliminar la imagen?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Sí",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    },
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <ScrollView
            horizontal 
            style={styles.viewImages}
        >
            {
                size(imagesSelected) < 10 && (
                    <Icon
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    />
                )
            }
            {
                map(imagesSelected, (imageRestaurant, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageRestaurant }}
                        onPress={() => removeImage(imageRestaurant)}
                    />
                ))
            }
        </ScrollView>
    )
}

function ImageRestaurant(props) {
    const { imagenRestaurant } = props;
  
    return (
      <View style={styles.viewPhoto}>
        <Image
            source={
                imagenRestaurant
                    ? { uri: imagenRestaurant }
                    : require("../../../assets/no-image.png")
            }
            style={{ width: widthScreen, height: 200 }}
        />
      </View>
    )
  }
  

const defaultFormValues = () => {
    return { 
        name: "", 
        description: "", 
        phone: "", 
        address: "", 
        country: "CO",
        callingCode: "57" 
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        height: "100%"
    },
    viewForm: {
        marginHorizontal: 10
    },
    textArea: {
        height: 100,
        width: "100%",
    },
    phonView: {
        flexDirection: "row",
        justifyContent: "center",
    },
    inputPhone: {
        width: "80%",
    },
    btnAddRestaurant: {
       margin: 20,
       backgroundColor: "#442484"
    },
    viewImages: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30,
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3",
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20,
    },
})
