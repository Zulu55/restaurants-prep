import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native"
import { Image } from "react-native-elements";
import { size } from "lodash";
  
export default function ListRestaurants(props) {
    const { restaurants, navigation } = props

    return (
        <View>
            <FlatList
                data={restaurants}
                renderItem={(restaurant) => (
                    <Restaurant restaurant={restaurant} navigation={navigation} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

function Restaurant(props) {
    const { restaurant, navigation } = props
    const { id, images, name, address, description, phone } = restaurant.item;
    const imageRestaurant = images ? images[0] : null
  
    return (
        <TouchableOpacity>
            <View style={styles.viewRestaurant}>
                <View style={styles.viewRestaurantImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="fff" />}
                        source={
                            imageRestaurant
                                ? { uri: imageRestaurant }
                                : require("../../../assets/no-image.png")
                        }
                        style={styles.imageRestaurant}
                    />
                </View>
                <View>
                    <Text style={styles.restaurantName}>{name}</Text>
                    <Text style={styles.restaurantAddress}>{address}</Text>
                    <Text style={styles.restaurantAddress}>{phone}</Text>
                    <Text style={styles.restaurantDescription}>
                        {
                            size(description) > 60 
                                ? `${description.substr(0, 60)}...`
                                : description
                        }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
  

const styles = StyleSheet.create({
    viewRestaurant: {
        flexDirection: "row",
        margin: 10,
    },
    viewRestaurantImage: {
        marginRight: 15,
    },
    imageRestaurant: {
        width: 90,
        height: 90,
    },
    restaurantName: {
        fontWeight: "bold",
    },
    restaurantAddress: {
        paddingTop: 2,
        color: "grey",
    },
    restaurantDescription: {
        paddingTop: 2,
        color: "grey",
        width: "75%",
    },
})
