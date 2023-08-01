import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import ImageView from "react-native-image-viewing"
import { useState } from 'react'
import { ActivityIndicator, Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import ReviewCard from '../../../components/customer/ReviewCard'

export default function DetailHotelCustomer({ navigation, route }) {
    const { id } = route.params
    const data = useSelector((state) => state.hotel.data)
    const [hotel] = data.filter((e) => e.id === id)
    const [visible, setIsVisible] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)

    console.log(hotel.images)

    // loading dulu sebelum dapet detail
    if (!hotel.location) {
        return <View style={{ justifyContent: 'center', flex: 1 }}>
            <ActivityIndicator size={'large'}></ActivityIndicator>
        </View>
    }

    const handleBookScreen = () => {
        navigation.navigate('Hotel Book', {id})
    }

    const location = {
        latitude: hotel.location.coordinates[0],
        longitude: hotel.location.coordinates[1],
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    }

    const newImages = hotel.images.map((e) => {
        const { id, imageUrl } = e
        return {
            id,
            uri: imageUrl
        }
    })


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
                    images={newImages} // harus array of object dengan key uri
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
                            newImages.map((e, i) => { // ini galerinya, yang bisa trigger imageviewnya
                                console.log(e)
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
                            hotel.reviews.map((e, i) => {
                                return (
                                    <ReviewCard key={i} review={e} />
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
                <Text>{hotel.description}</Text>
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
    title: { fontSize: 25, fontWeight: 'bold', marginBottom: 12, marginTop: 12 },
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
