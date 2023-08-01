import { StatusBar } from 'expo-status-bar'
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { Button, Checkbox, Modal, PaperProvider, Portal } from 'react-native-paper';
import RoomCard from '../../../components/customer/RoomCard';
import { useSelector } from 'react-redux';

export default function BookHotelCustomer({ navigation, route }) {
    const { id } = route.params
    const [groom, setGroom] = useState(false)
    const [vaccine, setVaccine] = useState(false)
    // total2an
    const [pet, setPet] = useState(3) // dapet dari local storage
    const [total, setTotal] = useState(0)
    const [selectedId, setSelectedId] = useState() // room id
    const data = useSelector((state) => state.hotel.data)
    const [hotel] = data.filter((e) => e.id === id)
    


    // keperluan modal
    const [visible, setVisible] = useState(false);

    const [desc, setDesc] = useState({
        description: '',
        imageUrl: ''
    })

    const showModal = (id) => {
        setVisible(true)
        const [desc] = hotel.detailRoom.filter(e => e.id === id)
        console.log(desc)
        setDesc({
            description: desc.description,
            imageUrl: desc.imageUrl
        })
    };
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, alignItems: 'center' };


    // hadnle tomobl book
    const handleBook = () => {
        const [roomPrice] = hotel.detailRoom.filter((e) => e.id === selectedId)

        console.log(pet * roomPrice.price)
    }
    const handleRoomId = (id) => {
        setSelectedId(id)
        const [roomPrice] = hotel.detailRoom.filter((e) => e.id === id)
        let tempTotal = roomPrice.price * pet
        setTotal(tempTotal)
    }

    return (
        <PaperProvider>
            {/* Modal */}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Image source={{ uri: desc.imageUrl }} style={{ width: 200, height: 200 }}></Image>
                    <Text>{desc.description}</Text>
                </Modal>
            </Portal>
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

                        {
                            hotel.detailRoom.map((e, i) => {
                                return <RoomCard key={i} handleRoomId={handleRoomId} id={e.id} selectedId={selectedId} room={e} showModal={showModal} />
                            })
                        }
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
                                    color='#48034F'
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
                                    color='#48034F'
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
                            <Text style={card.total}>Rp. {total} </Text>
                        </View>
                    </View>

                    <Button mode='contained' style={{ marginTop: 15 }} theme={{ colors: { primary: '#48034F' } }} onPress={handleBook}>Book</Button>
                    <StatusBar style="auto" />
                </View>
            </ScrollView>

        </PaperProvider>
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
    active: { backgroundColor: '#48034F' }
})