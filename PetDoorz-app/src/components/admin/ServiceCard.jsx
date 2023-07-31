import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'

export default function ServiceCard({ service }) {
    const currency = (value) => {
        return new Intl.NumberFormat('id-Id', { style: 'currency', currency: 'IDR' }).format(value)
    }

    return (
        <TouchableOpacity activeOpacity={0.85}>
            <View style={[styles.card, styles.shadowProp]}>
                <View style={{ flex: 1 }}>
                    {/* Card content */}
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>{service.name}</Text>
                    <Text style={{ fontSize: 13, color: 'white', marginTop: 5 }}>Price: {currency(service.price)}</Text>
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