import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"


export default function BooksCustomer({ navigation }) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Books</Text>
                <View style={{ marginTop: 20 }}>
                    {/* List Booking */}
                    <TouchableOpacity activeOpacity={0.7} style={styles.shadowProp} onPress={() => navigation.navigate('Customer Book Detail')}>
                        <View style={[styles.card]}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Alpha Pet Hotel</Text>
                                        <Text style={{ fontSize: 10, fontWeight: '300' }}>27/08/2023</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.statusCard}>Booked</Text>
                                    </View>
                                </View>
                                <Text style={{ fontSize: 13, color: 'black', marginTop: 5, fontWeight: '300' }}>Total Pet: 3</Text>
                                <Text style={{ fontSize: 13, color: 'black', fontWeight: '300', marginTop: 3 }}>Rp. 350.000</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={styles.shadowProp}>
                        <View style={[styles.card]}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Alpha Pet Hotel</Text>
                                        <Text style={{ fontSize: 10, fontWeight: '300' }}>28/08/2023</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.statusCard}>Done</Text>
                                    </View>
                                </View>
                                <Text style={{ fontSize: 13, color: 'black', marginTop: 5, fontWeight: '300' }}>Total Pet: 3</Text>
                                <Text style={{ fontSize: 13, color: 'black', fontWeight: '300', marginTop: 3 }}>Rp. 350.000</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
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