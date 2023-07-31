import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'


export default function RoomCard({ room, handleEditFormScreen }) {
    const currency = (value) => {
        return new Intl.NumberFormat('id-Id', { style: 'currency', currency: 'IDR' }).format(value)
    }

    return (
        <TouchableOpacity activeOpacity={0.85} onPress={handleEditFormScreen}>
            <View style={[styles.card, styles.shadowProp]}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>{room.name}</Text>
                    <Text style={{ fontSize: 13, color: 'white', marginTop: 5 }}>Price: {currency(room.price)}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 17 }}>
                    <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 12
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    card: {
        height: 80,
        backgroundColor: 'gray',
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row'
    },
});
