import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import ImageView from "react-native-image-viewing"
import { useState } from 'react'

export default function DetailHotelCustomer() {
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
            uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
        },
        {
            uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
        },
        {
            uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
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
            <View style={{}}>
                <ImageView
                    images={images}
                    imageIndex={imageIndex}
                    visible={visible}
                    onRequestClose={() => setIsVisible(false)}
                />
                <MapView
                    style={styles.map}
                    region={location}
                >
                </MapView>
                <View style={{ flexDirection: 'row' }}>
                    {
                        images.map((e, i) => {
                            return <TouchableOpacity key={i} activeOpacity={0.8} onPress={() => onSelect(i)}>
                                <Image source={e} style={{ width: 100, height: 100 }} />
                            </TouchableOpacity>
                        })
                    }
                </View>
            </View>
            <Text style={styles.title}>{hotel.name}</Text>
            <View style={{ marginTop: 15, height: 100, backgroundColor: 'gray' }}>
                <Text>Tes</Text>
            </View>
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15
    },
    map: {
        width: '100%',
        height: 250
    },
    title: { fontSize: 20, fontWeight: 'bold', marginTop: 20 }
});
