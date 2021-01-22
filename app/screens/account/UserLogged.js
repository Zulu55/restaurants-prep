import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { closeSession } from '../../utils/actions'

export default function UserLogged() {
    const navigation = useNavigation()

    return (
        <View>
            <Text>User Logged...</Text>
            <Button
                title="Cerrar Sesión"
                onPress={() => {
                    closeSession()
                    navigation.navigate("restaurants")
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
