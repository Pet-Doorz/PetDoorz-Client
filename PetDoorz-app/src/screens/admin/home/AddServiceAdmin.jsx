import { ScrollView, StyleSheet, View } from "react-native"
import { Text } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { Picker } from '@react-native-picker/picker'
import { useState } from "react"

export default function AddServiceAdmin() {
    const [service, setService] = useState()

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={[{ marginTop: 10, gap: 9 }, styles.card]}>
                <Text style={styles.title}>Add Service</Text>
                {/* Picker pake package */}
                <Picker
                    mode="dropdown"
                    selectedValue={service}
                    onValueChange={(itemValue, itemIndex) =>
                        setService(itemValue)
                    }>
                    {/* Picker Item, pilihan service statis dari kita */}
                    <Picker.Item label="Grooming" value="grooming" />
                    <Picker.Item label="Vaccine" value="vaccine" />
                </Picker>
                <TextInput mode="outlined" label={'Service Price'} inputMode="numeric"></TextInput>
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