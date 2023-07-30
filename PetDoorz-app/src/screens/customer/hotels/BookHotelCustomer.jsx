import { StatusBar } from 'expo-status-bar'
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, Checkbox } from 'react-native-paper';

export default function BookHotelCustomer({ navigation }) {
    const [groom, setGroom] = useState(false)
    const [vaccine, setVaccine] = useState(false)
    const [selectedId, setSelectedId] = useState()

    const handleRoomId = (id) => {
        setSelectedId(id)
    }

    const handlePaymentScreen = () => {
        navigation.navigate('Payment Gateway', {
            url: 'https://app.sandbox.midtrans.com/snap/v3/redirection/87e8fb5d-9a9d-4fca-a600-9808d685bdfb' // passing url disini
        })
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            {/* Diatasnya card */}
            <View style={[styles.card, styles.shadowProp]}>
                {/* Title card / nama hotel */}
                <Text style={styles.bookTitle}>Alpha Pet Hotel</Text>
                <View style={styles.horizontalMarker} />
                {/* Printilan */}
                <View style={styles.bookRow}>
                    <Text style={styles.bookTextContent}>Date Checkin</Text>
                    <Text style={styles.bookTextContent}>27 / 8 / 2023</Text>
                </View>
                <View style={styles.bookRow}>
                    <Text style={styles.bookTextContent}>Date Checkout</Text>
                    <Text style={styles.bookTextContent}>28 / 8 / 2023</Text>
                </View>
                <View style={styles.bookRow}>
                    <Text style={styles.bookTextContent}>Total Pet</Text>
                    <Text style={styles.bookTextContent}>3</Text>
                </View>

                {/* Choose Room, roomcard bisa jadi component */}
                <View>
                    <Text style={styles.bookTextContent}>Choose room :</Text>
                    {/* Room card, dapetnya id aja kali */}
                    <TouchableOpacity style={[styles.roomCard, selectedId === 0 ? card.active : '' ]} activeOpacity={0.87}
                        onPress={() => handleRoomId(0)}
                    >
                        <View>
                            <Text style={card.title}>Reguler Room</Text>
                            <Text style={card.textContent}>Available: 3</Text>
                        </View>
                        <View>
                            <Text style={card.priceText}>Rp. 200.000</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Room card */}
                    <TouchableOpacity style={[styles.roomCard, selectedId === 1 ? card.active : '' ]} activeOpacity={0.87}
                        onPress={() => handleRoomId(1)}
                    >
                        <View>
                            <Text style={card.title}>VIP Room</Text>
                            <Text style={card.textContent}>Available: 3</Text>
                        </View>
                        <View>
                            <Text style={card.priceText}>Rp. 300.000</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Checkbox */}
                <View>
                    {/* Checkbox groom, ini nanti bisa di slicing jadi component */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox
                                status={groom ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setGroom(!groom);
                                }}
                                color='gray'
                            />
                            <Text>Grooming</Text>
                        </View>
                        <View>
                            {/* Price bisa diganti */}
                            <Text>Rp 50.000</Text>
                        </View>
                    </View>

                    {/* Checkbox groom, ini nanti bisa di slicing jadi component */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* Checkbox vaccine */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox
                                status={vaccine ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setVaccine(!vaccine);
                                }}
                                color='gray'
                            />
                            <Text>Vaccine</Text>
                        </View>
                        <View>
                            {/* Price bisa diganti */}
                            <Text>Rp 50.000</Text>
                        </View>
                    </View>

                    {/* Grand Total, masi hardcode   */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                        <Text style={card.total}>Grand Total</Text>
                        <Text style={card.total}>Rp. 350.000 </Text>
                    </View>
                </View>

                <Button mode='contained' style={{ marginTop: 15 }} theme={{ colors: { primary: 'gray' } }} onPress={handlePaymentScreen}>Book</Button>
                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    roomCard: {
        backgroundColor: 'gray',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        width: '90%',
        paddingBottom: 25
    },
    shadowProp: {
        elevation: 3
    },
    horizontalMarker: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 12,
        marginBottom: 12,
        elevation: 2
    },
    bookTitle: {
        fontSize: 20,
        fontWeight: '500'
    },
    bookTextContent: {
        fontSize: 16
    },
    bookRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10
    }
})


const card = StyleSheet.create({
    title: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    textContent: {
        fontSize: 14,
        color: 'white',
        fontWeight: '400',
        marginTop: 10
    },
    priceText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    active: { borderWidth: 2 }
})