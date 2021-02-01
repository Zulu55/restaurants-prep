import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Alert, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { Rating, ListItem, Icon } from 'react-native-elements'
import { map } from 'lodash'
import { useFocusEffect } from '@react-navigation/native'
import firebase from 'firebase/app'
import Toast from 'react-native-easy-toast'

import Loading from '../../components/Loading'
import Map from '../../components/Map'
import CarouselImages from '../../components/CarouselImages'
import ListReviews from '../../components/restaurants/ListReview'
import { addRecordWithOutId, getCurrentUser, getIsFavorite, getRecordById, removeFromFavorite } from '../../utils/actions'
import { formatPhone, callNumber, sendWhatsApp, sendEmail } from '../../utils/utils'

const screeenWidth = Dimensions.get("window").width

export default function Restaurant(props) {
    const { navigation, route } = props
    const { id, name } = route.params
    const toastRef = useRef()

    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState(null)
    const [currentUser, setcurrentUser] = useState(null)

    navigation.setOptions({ title: name })

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
        setcurrentUser(user)
    })
    
    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getRecordById("restaurants", id)
                if (response.statusResponse) {
                    setRestaurant(response.document)
                } else {
                    setRestaurant({})
                    Alert.alert("Ocurrio un problema cargando el restautante, intente más tarde.")
                }
            })()
        }, [])
    )

    useEffect(() => {
        (async() => {
            if (userLogged && restaurant) {
                const response = await getIsFavorite(restaurant.id)
                response.statusResponse && setIsFavorite(response.isFavorite)
            }
        })()
    }, [userLogged, restaurant])

    if(!restaurant) return <Loading isVisble={true} text="Cargando..."/>

    const addFavorite = async() => {
        if (!userLogged) {
            toastRef.current.show("Para agregar a favoritos tienes que estar logeado.", 3000)
            return
        }

        setLoadingText("Adicionando a favoritos...")
        setLoading(true)
        const response = await addRecordWithOutId("favorites", {
            idUser: getCurrentUser().uid,
            idRestaurant: restaurant.id            
        })
        setLoading(false)

        if (response.statusResponse) {
            setIsFavorite(true)
            toastRef.current.show("Restaurante añadido a favoritos.", 3000)
        } else {
            toastRef.current.show("No se pudo agregar el restaurante a favoritos.", 3000)
        }
    }

    const removeFavorite = async () => {
        setLoadingText("Eliminando de favoritos...")
        setLoading(true)
        const response = await removeFromFavorite(restaurant.id)
        setLoading(false)

        if (response.statusResponse) {
            setIsFavorite(false)
            toastRef.current.show("Restaurante eliminado de favoritos.", 3000)
        } else {
            toastRef.current.show("No se pudo eliminar el restaurante de favoritos.", 3000)
        }
    }

    return (
        <ScrollView style={styles.viewBody}>
            <View style={styles.viewFavorite}>
                <Icon
                    type="material-community"
                    name={ isFavorite ? "heart" : "heart-outline"} 
                    onPress={ isFavorite ? removeFavorite : addFavorite }
                    color={ isFavorite ? "#f00" : "#442484" }
                    size={35}
                    underlayColor="transparent"
                />
            </View>
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
                email="jzuluaga55@gmail.com"
                currentUser={currentUser}
            />
            <ListReviews
                navigation={navigation}
                idRestaurant={restaurant.id}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text={loadingText}/>
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
    const { location, name, address, phone, email, currentUser } = props
    
    const listInfo = [
        {
            text: address,
            iconName: "map-marker",
            type: "address"
        },
        {
            text: formatPhone(phone),
            iconName: "phone",
            iconRight: "whatsapp",
            iconRigthColor: "#25D366",
            actionLeft: "callPhone",
            actionRight: "sendWhatsApp",
            type: "phone"
        },
        {
            text: email,
            iconName: "at",
            type: "email"
        }
    ]

    const actionLeft = (type) => {
        if (type === "phone") {
            callNumber(phone)
        } else if (type === "email") {
            if (currentUser) {
                sendEmail(email, "Interesado", `Soy ${getCurrentUser().displayName}, estoy interesado en...`)
            } else {
                sendEmail(email, "Interesado", `Estoy interesado en...`)
            }   
        }
    }

    const actionRight = () => {
        if (currentUser) {
            sendWhatsApp(phone, `Soy ${getCurrentUser().displayName}, estoy interesado en...`)
        } else {
            sendWhatsApp(phone, `Estoy interesado en...`)
        }   
    }

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
                            onPress={() => actionLeft(item.type)}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>

                        {
                            item.iconRight && (
                                <Icon
                                    type="material-community"
                                    name={item.iconRight}
                                    color={item.iconRigthColor}
                                    onPress={actionRight}
                                />
                            )
                        }
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
    viewFavorite: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15
    }
})
