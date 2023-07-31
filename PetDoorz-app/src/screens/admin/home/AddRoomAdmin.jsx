import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { FontAwesome } from '@expo/vector-icons'


export default function AddRoomAdmin() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={[{ marginTop: 10, gap: 9 }, styles.card]}>
                <Text style={styles.title}>Add Room</Text>
                <TextInput mode="outlined" label={'Room Name'}></TextInput>
                <TextInput mode="outlined" label={'Room Description'}></TextInput>
                <TextInput mode="outlined" label={'Room Capacity'} inputMode="numeric"></TextInput>
                <TextInput mode="outlined" label={'Room Price'} inputMode="numeric"></TextInput>
                {/* Input image */}
                <View style={{ flexDirection: 'row' }}>
                    <TextInput mode="outlined" label={'Image 1'} style={{ flex: 2 }} disabled value="http://awkdjawd"></TextInput>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 20, marginStart: 20 }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('camera')}>
                            <FontAwesome name="camera" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('galery')}>
                            <FontAwesome name="upload" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{ flexDirection: 'row' }}>
                    <TextInput mode="outlined" label={'Image 1'} style={{ flex: 2 }} disabled value="http://awkdjawd"></TextInput>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 20, marginStart: 20 }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('camera')}>
                            <FontAwesome name="camera" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('galery')}>
                            <FontAwesome name="upload" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput mode="outlined" label={'Image 1'} style={{ flex: 2 }} disabled value="http://awkdjawd"></TextInput>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 20, marginStart: 20 }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('camera')}>
                            <FontAwesome name="camera" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('galery')}>
                            <FontAwesome name="upload" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>


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