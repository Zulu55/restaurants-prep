import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function Login() {
    return (
        <ScrollView>
            <Image
                source={require("../../../assets/logo_restaurant.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <View style={styles.viewContainer}>
                <Text>Login Form</Text>
                <CreateAccount/>
            </View>
            <Divider style={styles.divider}/>
        </ScrollView>
    )
}

function CreateAccount() {
    const navigation = useNavigation()

    return (
        <Text style={styles.register}>
            ¿Aún no tienes una cuenta?{" "}
            <Text 
                style={styles.btnRegister}
                onPress={() => navigation.navigate("register")}
            >
                Regístrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: "100%",
        marginBottom: 20
    },
    viewContainer: {
        marginHorizontal: 40
    },
    register: {
        marginTop: 15,
        marginHorizontal: 10,
        alignSelf: "center"
    },
    btnRegister: {
        color: "#442484",
        fontWeight: "bold"
    },
    divider: {
        backgroundColor: "#442484",
        margin: 40
    }
})
