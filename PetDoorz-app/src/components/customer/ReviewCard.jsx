import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { FontAwesome } from '@expo/vector-icons'


export default function ReviewCard({ review }) {
    console.log(review)
    return (
        <TouchableOpacity style={[styles.card, styles.shadowProp]}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Rating</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16 }}> 4 / 5  </Text>
                        <FontAwesome name="star" size={24} color="yellow" />
                    </View>
                </View>
                <View style={{ marginTop: 10, gap: 5 }}>
                    <Text>Nama reviewer</Text>
                    <Text style={{ fontSize: 12, fontWeight: '300' }}>{review.comment}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shadowProp: {
        elevation: 5,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        width: 200
    },
});