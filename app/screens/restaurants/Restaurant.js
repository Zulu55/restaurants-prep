import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { Rating, ListItem, Icon } from 'react-native-elements'
import { map } from 'lodash'

import Loading from '../../components/Loading'
import Map from '../../components/Map'
import CarouselImages from '../../components/CarouselImages'
import { getRecordById } from '../../utils/actions'
import { formatPhone } from '../../utils/utils'

const screeenWidth = Dimensions.get("window").width

export default function Restaurant(props) {
    const { navigation, route } = props
    const { id, name } = route.params

    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [rating, setRating] = useState(0)

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
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
            />
            <RestaurantInfo
                name={restaurant.name}
                location={restaurant.location}
                address={restaurant.address}
                phone={restaurant.phone}
            />
        </ScrollView>
    )
}

function TitleRestaurant(props) {
    const { name, description, rating } = props

    return (
        <View style={styles.viewRestaurantTitle}>
            <View style={styles.viewRestaurantContainer}>
                <Text style={styles.nameRestaurant}>{name}</Text>
                <Rating 
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descriptionRestaurant}>{description}</Text>
        </View>
    )
}

function RestaurantInfo(props) {
    const { location, name, address, phone } = props
    
    const listInfo = [
        {
            text: address,
            iconName: "map-marker",
        },
        {
            text: formatPhone(phone),
            iconName: "phone",
        },
        {
            text: "jzuluaga55@gmail.com",
            iconName: "at",
        }
    ]

    return (
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restaurantInfoTitle}>
                Información sobre el restaurante
            </Text>
            <Map
                location={location}
                name={name}
                height={100}
            />
            { 
                map(listInfo, (item, index) => (
                    <ListItem 
                        key={index}
                        style={styles.containerListItem}
                    >
                        <Icon
                            type="material-community"
                            name={item.iconName}
                            color="#442484"
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    viewRestaurantTitle: {
        padding: 15
    },
    viewRestaurantContainer: {
        flexDirection: "row"
    },
    descriptionRestaurant: {
        marginTop: 5,
        color: "gray",
        textAlign: "justify"
    },
    rating: {
        position: "absolute",
        right: 0
    },
    viewRestaurantInfo: {
        margin: 15,
        marginTop: 25,
    },
    restaurantInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    containerListItem: {
        borderBottomColor: "#a376c7",
        borderBottomWidth: 1
    },
})
