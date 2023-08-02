import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export default function BookingCard({ booking, handleBookingDetails, handleChatHotel, handleReview }) {
    const date = new Date(booking.createdAt)

    // const handleReview = (bookingId, HotelId, hotelName) => {
    //     console.log(booking.id, booking.Room.HotelId, booking.Room.Hotel.name)
    // }

    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.shadowProp} onPress={() => { handleBookingDetails(booking.id) }}>
            <View style={[styles.card]}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>{booking.Room.Hotel.name}</Text>
                            <Text style={{ fontSize: 10, fontWeight: '300' }}>{date.toLocaleDateString("en-GB")}</Text>
                        </View>
                        <View>
                            <Text style={styles.statusCard}>{booking.status}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 13, color: 'black', marginTop: 5, fontWeight: '300' }}>Total Pet: {booking.totalPet}</Text>
                            <Text style={{ fontSize: 13, color: 'black', fontWeight: '300', marginTop: 3 }}>Rp. {booking.grandTotal}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                {
                                    booking.status === 'process' ? 
                                    <TouchableOpacity style={styles.buttonCall} activeOpacity={0.5} onPress={() => console.log('vidcall')}>
                                        <Text>Video Call</Text>
                                    </TouchableOpacity> : booking.status === 'done' ? 
                                    (<TouchableOpacity style={styles.buttonCall} activeOpacity={0.5} onPress={() => handleReview(booking.id, booking.Room.HotelId, booking.Room.Hotel.name)}>
                                        <Text>Review</Text>
                                    </TouchableOpacity>) : ''
                                }
                                <TouchableOpacity style={styles.buttonCall} activeOpacity={0.5} onPress={() => handleChatHotel(booking.Room.HotelId)}>
                                    <Text>Chat</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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
        flexDirection: 'row',
        borderRadius: 10
    },
    shadowProp: {
        elevation: 5
    },
    statusCard: {
        backgroundColor: '#48034F',
        flexDirection: 'row',
        color: 'white',
        padding: 3,
        fontSize: 15,
        width: 64,
        textAlign: 'center'
    },
    buttonCall: {
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 5,
        flexDirection: 'row',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1
    }
})