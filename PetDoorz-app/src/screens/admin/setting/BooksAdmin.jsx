import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import BookingCardAdmin from "../../../components/admin/BookingCardAdmin"


export default function BooksAdmin({ navigation }) {
    // get hotel bookings
    const detail = useSelector((state) => state.admin.detailAdmin)
    const bookings = []
    const data = detail.Rooms.map((e) => e.Bookings)
    data.forEach((e) => {
        e.forEach((i) => {
            bookings.push(i)
        })
    })

    const handleBookingDetails = (id) => {
        navigation.navigate('Admin Book Detail Stack', {
            id
        })
    }


    const handleVidCallHotel = () => {

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Books Admin</Text>
                <View style={{ marginTop: 20 }}>
                    {
                        bookings.map((e) => {
                            return (
                                <BookingCardAdmin key={e.id} booking={e} handleBookingDetails={handleBookingDetails} />
                            )
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