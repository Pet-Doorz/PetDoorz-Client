import { ScrollView, StyleSheet, View } from "react-native"
import { Text } from "react-native"
import { Button, TextInput } from "react-native-paper"


export default function AddRoomAdmin() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={[{ marginTop: 10, gap: 9 }, styles.card]}>
            <Text style={styles.title}>Add Room</Text>
                <TextInput mode="outlined" label={'Room Name'}></TextInput>
                <TextInput mode="outlined" label={'Room Description'}></TextInput>
                <TextInput mode="outlined" label={'Room Capacity'} inputMode="numeric"></TextInput>
                <TextInput mode="outlined" label={'Room Price'} inputMode="numeric"></TextInput>
                <TextInput mode="outlined" label={'Image 1'}></TextInput>
                <TextInput mode="outlined" label={'Image 2'}></TextInput>
                <TextInput mode="outlined" label={'Image 3'}></TextInput>
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
        width: '98%'
    },
})