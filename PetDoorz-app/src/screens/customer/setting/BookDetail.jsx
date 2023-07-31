import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Button } from "react-native-paper"
import ImageView from "react-native-image-viewing"
import { useState } from "react"


export default function BookDetail() {
    const status = 'process' // didapat dari status detail
    const [visible, setIsVisible] = useState(false) // bikin foto jadi keliatan
    const images = [
        {
            uri: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
        }
    ]

    return (
        <ScrollView>
            <ImageView // ini tuh cuman modal doang, jadi harus ditrigger, triggernya lewat touchable opacity dibawah
                images={images} // harus array of object dengan key uri
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
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
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setIsVisible(true)}>
                            <Image style={{ width: 100, height: 100 }} source={{ uri: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80' }} />
                        </TouchableOpacity>
                        {/* dialog untuk done */}
                        <Button mode="contained" disabled={status === 'process' ? false : true} style={{ borderRadius: 10 }} theme={{ colors: { primary: '#48034F' } }}>Done</Button>
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