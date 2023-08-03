import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Button, Dialog, Portal, PaperProvider } from "react-native-paper"
import ImageView from "react-native-image-viewing"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { updateStatusDone, detailCustomer } from '../../../store/actions/actionCustomer'


export default function BookDetail({ route, navigation }) {
    const { id } = route.params
    const bookings = useSelector((state) => state.customer.detailCustomer.Bookings)
    const [detail] = bookings.filter(e => e.id == id)
    const checkIn = new Date(detail.checkIn)
    const checkOut = new Date(detail.checkOut)
    const dispatch = useDispatch()

    const [done, setDone] = useState(false)

    const updateStatusToDone = async () => {
        const access_token = await AsyncStorage.getItem('customer_access_token')
        dispatch(updateStatusDone({
            id,
            access_token
        }))
            .then((result) => {
                console.log(result)
                return dispatch(detailCustomer(access_token))
            })
            .then((_) => {
                setDone(false)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const [visible, setIsVisible] = useState(false) // bikin foto jadi keliatan
    const images = [
        {
            uri: detail.petImage
        }
    ]

    const currency = (value) => {
        const currency = new Intl.NumberFormat('id-Id', { style: 'currency', currency: 'IDR' }).format(value)
        return currency.split(',')[0]
    }

    return (
        <PaperProvider>
            <ScrollView>
                <ImageView // ini tuh cuman modal doang, jadi harus ditrigger, triggernya lewat touchable opacity dibawah
                    images={images} // harus array of object dengan key uri
                    imageIndex={0}
                    visible={visible}
                    onRequestClose={() => setIsVisible(false)}
                />

                {/* Dialog untuk aktifkan status hotel */}
                <Portal>
                    <Dialog visible={done} onDismiss={() => setDone(false)}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyLarge">Set status to Done?</Text>
                            <Text variant="bodyMedium">This means your transaction would be completed.</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={updateStatusToDone}>Ok</Button>
                            <Button onPress={() => setDone(false)}>Cancel</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>


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
                                        detail.BookingServices.map((e) => e.Service.name).join(', ')
                                    ) : ''
                                }
                            </Text>
                        </View>
                        <View style={styles.contentRow}>
                            <Text>Total: </Text>
                            <Text>{currency(detail.grandTotal)}</Text>
                        </View>
                        <View style={styles.contentRow}>
                            <Text>Status: </Text>
                            <Text>{detail.status}</Text>
                        </View>

                        {/* Ini buat update status, sama upload foto */}
                        {
                            detail.status === 'process' || detail.status === 'done' ? (
                                <View style={{ alignItems: 'center', gap: 5 }}>
                                    <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 12 }}>Pet Photo</Text>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => setIsVisible(true)}>
                                        <Image style={{ width: 100, height: 100 }} source={{ uri: detail.petImage }} />
                                    </TouchableOpacity>
                                    {/* dialog untuk done */}
                                    <Button mode="contained" onPress={() => setDone(true)} disabled={detail.status === 'process' ? false : true} style={{ borderRadius: 10, marginTop: 12 }} theme={{ colors: { primary: '#48034F' } }}>Done</Button>
                                </View>
                            ) : ''
                        }
                    </View>
                </View>
            </ScrollView>
        </PaperProvider>
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