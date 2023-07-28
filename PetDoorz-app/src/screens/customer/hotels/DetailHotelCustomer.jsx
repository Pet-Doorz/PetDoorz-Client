import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

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

    return (
        <ScrollView style={styles.container}>
            <View style={{}}>
                <MapView
                    style={styles.map}
                    region={location}
                >
                </MapView>
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
