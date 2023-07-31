import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";


export default function BookDetail() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.title}>Alpha Pet Hotel</Text>
                        <Text style={{ fontWeight: '300' }}>27/08/2023</Text>
                    </View>
                    <View style={styles.horizontalMarker}></View>
                    <View style={styles.contentRow}>
                        <Text>Checkin Date: </Text>
                        <Text>28/08/2023</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Checkout Date: </Text>
                        <Text>29/08/2023</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Room: </Text>
                        <Text>VIP</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Total Pet: </Text>
                        <Text>3</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Services: </Text>
                        <Text>Grooming, Vaccine</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Total: </Text>
                        <Text>Rp. 350.000</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Status: </Text>
                        <Text>Book</Text>
                    </View>

                    {/* Ini buat update status, sama upload foto */}
                    <View style={{ alignItems: 'center', gap: 5 }}>
                        <Text>Pet Photo</Text>
                        <Text>Upload Your Photo</Text>
                        <Button mode="contained" style={{ borderRadius: 10 }} theme={{ colors: {primary: '#48034F'} }}>Process</Button>
                    </View>
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
        flexDirection: 'column',
        borderRadius: 10
    },
    horizontalMarker: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 12,
        marginBottom: 12,
        elevation: 2
    },
    contentRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }
})