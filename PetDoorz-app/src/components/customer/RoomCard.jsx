import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, Modal, PaperProvider, Portal } from 'react-native-paper'

export default function RoomCard({ handleRoomId, selectedId, id, room, showModal }) {
    const currency = (value) => {
        const currency = new Intl.NumberFormat('id-Id', { style: 'currency', currency: 'IDR' }).format(value)
        return currency.split(',')[0]
    }

    return (
        <>
            {/* Modal */}


            {/* Room card */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {/* <Button onPress={() => showModal(id)}>See Description</Button> */}
                <TouchableOpacity style={{ paddingTop:0 }} onPress={() => showModal(id)}>
                    <Text style={{ fontWeight: '400', fontSize: 15, color: '#48034F' }}>See Description</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.roomCard, selectedId === id ? card.active : '']} activeOpacity={0.87}
                onPress={() => handleRoomId(id)}
            >
                <View>
                    <Text style={card.title}>{room.name}</Text>
                    <Text style={card.textContent}>Available: {room.currentCapacity}</Text>
                </View>
                <View>
                    <Text style={card.priceText}>{currency(room.price)}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
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
    active: { backgroundColor: '#48034F' }
})