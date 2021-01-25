import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { Rating, ListItem, Icon } from 'react-native-elements'

import Loading from '../../components/Loading'
import CarouselImages from '../../components/CarouselImages'
import { getRecordById } from '../../utils/actions'

const screeenWidth = Dimensions.get("window").width

export default function Restaurant(props) {
    const { navigation, route } = props
    const { id, name } = route.params

    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0);

    navigation.setOptions({ title: name })

    useEffect(() => {
        (async () => {
            const response = await getRecordById("restaurants", id)
            console.log(response)
            if (response.statusResponse) {
                setRestaurant(response.document)
            } else {
                setRestaurant({})
                Alert.alert("Ocurrio un problema cargando el restautante, intente más tarde.")
            }
        })()
    }, [])

    if(!restaurant) return <Loading isVisble={true} text="Cargando..."/>

    return (
        <ScrollView style={styles.viewBody}>
            <CarouselImages
                images={restaurant.images}
                height={250}
                width={screeenWidth}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
    },
})
