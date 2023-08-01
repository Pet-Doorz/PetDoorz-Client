import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { getMidtrans } from "../../../store/actions/actionCustomer";

export default function AddBalanceCustomer({ navigation }) {
    const [amount, setAmount] = useState(0)
    const [nullAmount, setNullAmount] = useState(false)

    const dispatch = useDispatch()

    const handleAddBalance = async () => {
        if (!amount) return setNullAmount(true)
        const access_token = await AsyncStorage.getItem('customer_access_token')
        dispatch(getMidtrans({
            amount,
            access_token
        }))
            .then((result) => {
                const { redirect_url } = result
                navigation.navigate('Payment Gateway', {
                    redirect_url
                })
            })
            .catch((err) => {
                console.log(err)
            })        
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <View style={[card.container, card.shadowProp]}>
                <Text style={card.title}>Add Balance</Text>
                {
                    nullAmount ? <Text style={{ color: 'red' }}>Amount is required</Text> : ''
                }
                <View style={{ gap: 20 }}>
                    <TextInput label='Amount' mode="outlined" style={styles.textInput} inputMode="numeric" onChangeText={(amount) => { 
                        setAmount(amount)
                        setNullAmount(false)
                     }}></TextInput>
                    <Button onPress={handleAddBalance} mode="contained" style={{ borderRadius: 8 }} theme={{ colors: { primary: '#48034F' } }}>Pay</Button>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textInput: {
    }
})

const card = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        width: '90%',
        paddingBottom: 25
    },
    shadowProp: {
        elevation: 3
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 15
    },
    balance: {
        fontSize: 16,
        fontWeight: '500',
        marginEnd: 20
    }
})