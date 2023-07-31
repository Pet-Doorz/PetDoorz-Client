import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function AddBalanceCustomer() {
    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <View style={[card.container, card.shadowProp]}>
                <Text style={card.title}>Add Balance</Text>
                <View style={{ gap: 20 }}>
                    <TextInput label='Amount' mode="outlined" style={styles.textInput} inputMode="numeric"></TextInput>
                    <Button mode="contained" style={{ borderRadius: 8 }} theme={{ colors: { primary: '#48034F' } }}>Pay</Button>
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