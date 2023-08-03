import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import BookingCardAdmin from "../../../components/admin/BookingCardAdmin"
import { useCallback, useState } from "react"
import { Picker } from '@react-native-picker/picker'
import { FontAwesome } from '@expo/vector-icons'
import { detailAdmin } from "../../../store/actions/actionAdmin"
import { ActivityIndicator } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/core"

export default function BooksAdmin({ navigation }) {
    // get hotel bookings
    const detail = useSelector((state) => state.admin.detailAdmin)
    const bookings = []
    const data = detail.Rooms.map((e) => e.Bookings)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

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

    // handle filter
    const [filter, setFilter] = useState('all')
    const sortedBook = bookings.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    })
    const [filtered, setFiltered] = useState(sortedBook)

    const handleRefresh = async () => {
        setLoading(true)
        const access_token = await AsyncStorage.getItem('admin_access_token')
        dispatch(detailAdmin(access_token))
            .then((result) => {
                setFiltered(sortedBook)
            })
            .catch((err) => {
                console.log(err, '<<< review')
            })
            .finally((_) => {
                setLoading(false)
            })
    }

    if (loading) return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'}></ActivityIndicator>
        </View>
    )

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[styles.title, { flex: 2 }]}>Bookings Admin</Text>

                    {/* Picker pake package */}
                    <TouchableOpacity activeOpacity={0.7} onPress={handleRefresh}>
                        <FontAwesome name="refresh" size={23} color="#48034F" />
                    </TouchableOpacity>
                    <Picker
                        mode="dropdown"
                        selectedValue={filter}
                        onValueChange={(itemValue, itemIndex) => {
                            setFilter(itemValue)
                            if (itemValue === 'all') {
                                setFiltered(sortedBook)
                            } else {
                                const filtered = sortedBook.filter((e) => e.status === itemValue)
                                setFiltered(filtered)
                            }
                        }
                        }
                        style={{ flex: 1 }}
                    >
                        {/* Picker Item, pilihan service statis dari kita */}
                        <Picker.Item label="All" value="all" />
                        <Picker.Item label="Done" value="done" />
                        <Picker.Item label="Process" value="process" />
                        <Picker.Item label="Booked" value="booked" />
                    </Picker>

                </View>
                <View style={{ marginTop: 8 }}>
                    {
                        filtered.map((e) => {
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
        fontSize: 23,
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