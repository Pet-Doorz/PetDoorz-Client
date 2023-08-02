import { ScrollView, StyleSheet, View } from "react-native"
import { Text } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { Picker } from '@react-native-picker/picker'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { detailAdmin, postNewService } from "../../../store/actions/actionAdmin"

export default function AddServiceAdmin({ navigation }) {
    const dispatch = useDispatch()
    const [name, setName] = useState("Grooming")
    const [price, setPrice] = useState(0)

    console.log(name, price)

    function handleSubmit() {
        const payload = { name, price }
        dispatch(postNewService(payload))
            .then(() => {
                return dispatch(detailAdmin())
            })
            .then(() => {
                navigation.navigate('Home Admin Stack')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={[{ marginTop: 10, gap: 9 }, styles.card]}>
                <Text style={styles.title}>Add Service</Text>
                {/* Picker pake package */}
                <Picker
                    mode="dropdown"
                    selectedValue={name}
                    onValueChange={(itemValue, itemIndex) =>
                        setName(itemValue)
                    }>
                    {/* Picker Item, pilihan service statis dari kita */}
                    <Picker.Item label="Grooming" value="Grooming" />
                    <Picker.Item label="Vaccine" value="Vaccine" />
                </Picker>
                <TextInput mode="outlined" label={'Service Price'} inputMode="numeric" onChangeText={val => setPrice(val)}></TextInput>
                <Button mode="contained" style={{ borderRadius: 5, marginTop: 12 }} theme={{ colors: { primary: '#48034F' } }} onPress={handleSubmit}>Add</Button>
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