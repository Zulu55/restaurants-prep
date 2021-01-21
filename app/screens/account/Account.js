import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { isUserLogged } from '../../utils/actions'

import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Account() {
    const [login, setLogin] = useState(null)

    useEffect(() => {
        setLogin(isUserLogged())
    }, [])

    if (login === null) return <Text>Cargando...</Text>
    
    return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})
