import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useFocusEffect } from "@react-navigation/native"

import Loading from '../../components/Loading'
import ListRestaurants from './ListRestaurants'
import { getCurrentUser } from '../../utils/actions'

import { firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"
import { size } from 'lodash'

const db = firebase.firestore(firebaseApp)

export default function Restaurants(props) {
    const { navigation } = props
    const limitRestaurants = 7;

    const [user, setUser] = useState(null)
    const [restaurants, setRestaurants] = useState([]);
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    const [startRestaurant, setStartRestaurant] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])

    useFocusEffect(
        useCallback(async () => {
            setLoading(true)
            const currentUser = getCurrentUser() 
            currentUser ? setUser(true) : setUser(false)

            db.collection("restaurants")
                .get()
                .then((snap) => {
                    setTotalRestaurants(snap.size);
                })

            const resultRestaurants = [];
            db.collection("restaurants")
                .orderBy("createAt", "desc")
                .limit(limitRestaurants)
                .get()
                .then((response) => {
                    setStartRestaurant(response.docs[response.docs.length - 1])
                    response.forEach((doc) => {
                        const restaurant = doc.data()
                        restaurant.id = doc.id
                        resultRestaurants.push(restaurant)
                    });
                    setRestaurants(resultRestaurants)
                })

            setLoading(false)
        }, [])
    )
        
    if (user === null) {
        return <Loading isVisible={true} text="Cargando..."/>
    }

    return (
        <View style={styles.viewBody}>
            {
                size(restaurants) > 0 ? (
                    <ListRestaurants
                        restaurants={restaurants}
                        navigation={navigation}
                    />
                ) : (
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>No restaurantes configurados.</Text>
                    </View>
                ) 
            }
            {
                user && (
                    <Icon
                        type="material-community"
                        name="plus"
                        color="#442484"
                        reverse
                        containerStyle={styles.btnContainer}
                        onPress={() => navigation.navigate("add-restaurant") }
                    />
                )
            }
            <Loading isVisible={loading} text="Cargando Restaurantes..."/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    },
    notFoundView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },    
    notFoundText: {
        fontSize: 18,
        fontWeight: "bold"
    }
})
