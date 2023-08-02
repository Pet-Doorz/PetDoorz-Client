import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import BookingCard from "../../../components/customer/BookingCard"


export default function BooksCustomer({ navigation }) {
    const bookings = useSelector((state) => state.customer.detailCustomer.Bookings)
    const handleBookingDetails = (id) => {
        navigation.navigate('Customer Book Detail', {
            id
        })
    }

    const handleChatHotel = (id) => {
        console.log('dari parnet', id)
    }

    const handleVidCallHotel = () => {

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Books</Text>
                <View style={{ marginTop: 20 }}>
                    {/* List Booking */}
                    {
                        bookings.map((e) => {
                            return <BookingCard key={e.id} booking={e} handleBookingDetails={handleBookingDetails} handleChatHotel={handleChatHotel} />
                        })
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
        flexDirection: 'row',
        borderRadius: 10
    },
    shadowProp: {
        elevation: 5
    },
    statusCard: {
        backgroundColor: 'gray',
        flexDirection: 'row',
        color: 'white',
        padding: 3,
        fontSize: 15,
        width: 64,
        textAlign: 'center'
    }
})