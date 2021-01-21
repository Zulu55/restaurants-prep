import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'

export default function RegisterForm() {
    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Ingresa tu email..."
                containerStyle={styles.inputForm}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.icon}
                    />
                }
            />
            <Input
                placeholder="Ingresa tu contraseña..."
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={true}
            />
            <Input
                placeholder="Confirma tu contraseña..."
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={true}
            />
            <Button
                title="Registrar Nuevo Usuario"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    }, 
    inputForm: {
        width: "100%"
    },
    btnContainerRegister: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center",
    },
    btnRegister: {
        backgroundColor: "#442484"
    },
    icon: {
        color: "#c1c1c1"
    }
})
