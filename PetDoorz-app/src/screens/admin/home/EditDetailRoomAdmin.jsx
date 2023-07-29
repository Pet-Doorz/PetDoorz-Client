import { ScrollView, Text, StyleSheet, View } from "react-native"
import { TextInput, Button } from "react-native-paper"


export default function EditDetailRoomAdmin() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={[{ marginTop: 10, gap: 9 }, styles.card]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>Edit Room</Text>
                    <Button mode="contained" style={{ borderRadius: 5 }} theme={{ colors: { primary: '#b00808' } }} >Delete</Button>
                </View>
                <TextInput mode="outlined" label={'Room Name'} value="Room VIP"></TextInput>
                <TextInput mode="outlined" label={'Room Description'} value="Room Desc"></TextInput>
                <TextInput mode="outlined" label={'Room Capacity'} inputMode="numeric" value="20"></TextInput>
                <TextInput mode="outlined" label={'Room Price'} inputMode="numeric" value="200000"></TextInput>
                <TextInput mode="outlined" label={'Image 1'} value="image1"></TextInput>
                <TextInput mode="outlined" label={'Image 2'} value="image2"></TextInput>
                <TextInput mode="outlined" label={'Image 3'} value="image3"></TextInput>
                <Button mode="contained" style={{ borderRadius: 5, marginTop: 12 }} theme={{ colors: { primary: 'gray' } }}>Add</Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        paddingBottom: 25,
        elevation: 5,
        width: '98%',
        marginBottom: 50
    },
})