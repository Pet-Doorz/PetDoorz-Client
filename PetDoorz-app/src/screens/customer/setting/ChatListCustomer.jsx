import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'

export default function ChatListCustomer({ navigation }) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Chat List</Text>

                {/* Chat List */}
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Customer Chat')}>
                    <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
                        <Image source={{ uri: 'https://i.scdn.co/image/ab6761610000517492c8095c788abfd2de4a90ee' }} style={styles.imageRound} />
                        <View>
                            <Text style={styles.chatName}>Leonardo Ringo</Text>
                            <Text>...</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Customer Chat')}>
                    <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
                        <Image source={{ uri: 'https://i.scdn.co/image/ab6761610000517492c8095c788abfd2de4a90ee' }} style={styles.imageRound} />
                        <View>
                            <Text style={styles.chatName}>Leonardo Ringo</Text>
                            <Text>...</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Customer Chat')}>
                    <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
                        <Image source={{ uri: 'https://i.scdn.co/image/ab6761610000517492c8095c788abfd2de4a90ee' }} style={styles.imageRound} />
                        <View>
                            <Text style={styles.chatName}>Leonardo Ringo</Text>
                            <Text>...</Text>
                        </View>
                    </View>
                </TouchableOpacity>


            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12
    },
    imageRound: {
        width: 68,
        height: 68,
        borderRadius: 100
    },
    chatName: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: '600'
    }
});
