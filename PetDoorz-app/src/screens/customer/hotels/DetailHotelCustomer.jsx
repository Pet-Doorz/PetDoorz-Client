import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import ImageView from "react-native-image-viewing"
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { Button } from 'react-native-paper'

export default function DetailHotelCustomer({ navigation }) {
    const handleBookScreen = () => {
        navigation.navigate('Hotel Book')
    }

    const location = {
        latitude: -6.147642181387086,
        longitude: 106.71119003020036,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    }

    const hotel = {
        "id": 1,
        "email": "alpha@mail.com",
        "password": "alpha",
        "name": "Alpha Pet Hotel",
        "address": "Jl. Jakarta",
        "location": {
            "type": "Point",
            "coordinates": [
                -6.147642181387086,
                106.71119003020036
            ]
        },
        "logoHotel": "https://picsum.photos/400/600",
        "status": "active"
    }

    const images = [
        {
            id: 1,
            uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
        },
        {
            id: 2,
            uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
        },
        {
            id: 3,
            uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
        },
        {
            id: 4,
            uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
        },
        {
            id: 5,
            uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
        },
        {
            id: 6,
            uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
        },
    ]

    const reviews = [
        {
            name: 'Juan Alfonsus',
            comment: 'Keren bangettttt',
            rating: 1
        },
        {
            name: 'Ringo Gaurangga',
            comment: 'Keren bangettttt',
            rating: 4
        },
        {
            name: 'Raymond Fransisco',
            comment: 'Keren bangettttt',
            rating: 4
        },
        {
            name: 'Mike Leonardo',
            comment: 'Keren bangettttt',
            rating: 5
        },
    ]

    const [visible, setIsVisible] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)

    const onSelect = (index) => {
        setImageIndex(index)
        setIsVisible(true)
    }

    return (
        <ScrollView style={styles.container}>
            {/* Ini view map */}
            <View>
                <Text style={styles.title}>{hotel.name}</Text>
                <ImageView // ini tuh cuman modal doang, jadi harus ditrigger, triggernya lewat touchable opacity dibawah
                    images={images} // harus array of object dengan key uri
                    imageIndex={imageIndex}
                    visible={visible}
                    onRequestClose={() => setIsVisible(false)}
                />
                <MapView
                    style={styles.map}
                    region={location}
                >
                    <Marker draggable
                        coordinate={location}
                    />
                </MapView>
            </View>

            {/* Ini view galery */}
            <View style={{ marginTop: 20 }}>
                <ScrollView horizontal={true}>
                    <View style={{ flexDirection: 'row', gap: 15 }}>
                        {
                            images.map((e, i) => { // ini galerinya, yang bisa trigger imageviewnya
                                return (
                                    <TouchableOpacity key={e.id} activeOpacity={0.8} onPress={() => onSelect(i)}>
                                        <Image source={e} style={{ width: 100, height: 100 }} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
            {/* Garis horizontal */}
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginTop: 12,
                    elevation: 2
                }}
            />

            {/* Box description, review dll */}
            <View style={styles.perContent}>
                <Text style={styles.cardTitle}>Latest Review</Text>
                <ScrollView horizontal={true}>
                    <View style={{ flexDirection: 'row', gap: 15 }}>
                        {
                            reviews.map((e, i) => {
                                return (
                                    <TouchableOpacity key={i} style={[styles.card, styles.shadowProp]}>
                                        <View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text>Rating</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 16 }}> 4 / 5</Text>
                                                    <FontAwesome name="star" size={24} color="yellow" />
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 10, gap: 5 }}>
                                                <Text>{e.name}</Text>
                                                <Text style={{ fontSize: 12, fontWeight: '300' }}>{e.comment}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>

            {/* Garis horizontal */}
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginTop: 12,
                    elevation: 2
                }}
            />

            {/* Hotel Description */}
            <View style={styles.perContent}>
                <Text style={styles.cardTitle}>Description</Text>
                <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi atque distinctio esse odio animi! Corrupti, explicabo. Fugit reprehenderit reiciendis autem?</Text>
            </View>

            {/* Button buat jadwal, chat */}
            <View style={{ flexDirection: 'row', paddingBottom: 50, marginTop: 12, gap: 10 }}>
                <Button mode='contained' theme={{ colors: { primary: '#48034F' } }} onPress={handleBookScreen}>Book Now</Button>
                <Button mode='contained' theme={{ colors: { primary: '#48034F' } }}>Chat</Button>
            </View>
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
    },
    map: {
        width: '100%',
        height: 250
    },
    title: { fontSize: 25, fontWeight: 'bold', marginBottom: 12 },
    shadowProp: {
        elevation: 5,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        width: 200
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '500'
    },
    perContent: { padding: 2, marginTop: 6 }
});
