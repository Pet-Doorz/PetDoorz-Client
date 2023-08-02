import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Button } from "react-native-paper"
import ImageView from "react-native-image-viewing"
import { useState } from "react"
import { useSelector } from "react-redux"


export default function BookDetail({ route }) {
    const { id } = route.params
    const bookings = useSelector((state) => state.customer.detailCustomer.Bookings)
    const [detail] = bookings.filter(e => e.id == id)
    const checkIn = new Date(detail.checkIn)
    const checkOut = new Date(detail.checkOut)

    const status = 'process' // didapat dari status detail
    const [visible, setIsVisible] = useState(false) // bikin foto jadi keliatan
    const images = [
        {
            uri: detail.petImage
        }
    ]

    return (
        <ScrollView>
            <ImageView // ini tuh cuman modal doang, jadi harus ditrigger, triggernya lewat touchable opacity dibawah
                images={images} // harus array of object dengan key uri
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.title}>{detail.Room.Hotel.name}</Text>
                        <Text style={{ fontWeight: '300' }}>27/08/2023</Text>
                    </View>
                    <View style={styles.horizontalMarker}></View>
                    <View style={styles.contentRow}>
                        <Text>Checkin Date: </Text>
                        <Text>{checkIn.toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Checkout Date: </Text>
                        <Text>{checkOut.toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Room: </Text>
                        <Text>{detail.Room.name}</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Total Pet: </Text>
                        <Text>{detail.totalPet}</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Services: </Text>
                        <Text>
                            {
                                detail.BookingServices.length > 0 ? (
                                    detail.BookingServices.map((e) => e.Service.name)
                                ) : ''
                            }
                        </Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Total: </Text>
                        <Text>Rp. {detail.grandTotal}</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Status: </Text>
                        <Text>{detail.status}</Text>
                    </View>

                    {/* Ini buat update status, sama upload foto */}
                    {
                        detail.status === 'process' || detail.status === 'done' ? (
                            <View style={{ alignItems: 'center', gap: 5 }}>
                                <Text>Pet Photo</Text>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => setIsVisible(true)}>
                                    <Image style={{ width: 100, height: 100 }} source={{ uri: detail.petImage }} />
                                </TouchableOpacity>
                                {/* dialog untuk done */}
                                <Button mode="contained" disabled={status === 'process' ? false : true} style={{ borderRadius: 10 }} theme={{ colors: { primary: '#48034F' } }}>Done</Button>
                            </View>
                        ) : ''
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    title: {
        fontSize: 20,
        fontWeight: '600'
    },
    card: {
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        flexDirection: 'column',
        borderRadius: 10
    },
    horizontalMarker: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 12,
        marginBottom: 12,
        elevation: 2
    },
    contentRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }
})