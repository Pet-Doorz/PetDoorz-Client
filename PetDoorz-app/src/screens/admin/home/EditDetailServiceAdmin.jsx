import { ScrollView, StyleSheet, View } from "react-native"
import { Text } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { Picker } from '@react-native-picker/picker'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteService, detailAdmin, editService } from "../../../store/actions/actionAdmin"

export default function EditDetailServiceAdmin({ navigation, route }) {
    const dispatch = useDispatch()
    const detail = useSelector((state) => state.admin.detailAdmin)
    const { id } = route.params
    const service = detail.Services.find(e => e.id == id) || {}

    const [name, setName] = service ? useState(service.name) : useState("")
    const [price, setPrice] = service ? useState(service.price) : useState(0)

    function handleSubmit() {
        const payload = { name, price }
        dispatch(editService(payload, id))
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

    function handleDelete() {
        dispatch(deleteService(id))
            .then(() => {
                return dispatch(detailAdmin())
            })
            .then((res) => {
                navigation.navigate('Home Admin Stack')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={[{ marginTop: 10, gap: 9 }, styles.card]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>Edit Service</Text>
                    <Button mode="contained" style={{ borderRadius: 5 }} theme={{ colors: { primary: '#b00808' } }} onPress={handleDelete}>Delete</Button>
                </View>
                {/* Picker pake package */}
                <Picker
                    mode="dropdown"
                    selectedValue={service.name}
                    onValueChange={(itemValue, itemIndex) =>
                        setName(itemValue)
                    }>
                    {/* Picker Item, pilihan service statis dari kita */}
                    <Picker.Item label="Grooming" value="Grooming" />
                    <Picker.Item label="Vaccine" value="Vaccine" />
                </Picker>
                <TextInput mode="outlined" label={'Service Price'} inputMode="numeric" onChangeText={val => setPrice(val)} defaultValue={service.price + ""}></TextInput>
                <Button mode="contained" style={{ borderRadius: 5, marginTop: 12 }} theme={{ colors: { primary: 'gray' } }} onPress={handleSubmit}>Add</Button>
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