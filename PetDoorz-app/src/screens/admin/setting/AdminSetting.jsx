import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { Button, Dialog, Portal, PaperProvider } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SET_ROLE } from '../../../store/actions/actionUser'
import { useEffect, useState } from 'react'


export default function AdminSetting({ navigation }) {
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await AsyncStorage.clear()
        dispatch(SET_ROLE(''))
    }

    const [visible, setVisible] = useState(false)
    const [logout, setLogout] = useState(false)

    const showDialog = (value) => {
        if (value === 'logout') {
            setLogout(true)
        } else if (value === 'status') {
            setVisible(true)
        }
    }
    const hideDialog = (value) => {
        if (value === 'logout') {
            setLogout(false)
        } else if (value === 'status') {
            setVisible(false)
        }
    }

    const handleStatusHotel = () => {
        // Logic handleStatus Hotel
        console.log('Active hotel!')
        setVisible(false)
    }

    return (
        <PaperProvider>
            <SafeAreaView>
                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    {/* Dialog untuk aktifkan status hotel */}
                    <Portal>
                        <Dialog visible={visible} onDismiss={() => hideDialog('status')}>
                            <Dialog.Title>Alert</Dialog.Title>
                            <Dialog.Content>
                                <Text variant="bodyMedium">Set hotel to Active?</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={handleStatusHotel}>Ok</Button>
                                <Button onPress={() => hideDialog('status')}>Cancel</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>

                    {/* Dialog untuk logout */}
                    <Portal>
                        <Dialog visible={logout} onDismiss={() => hideDialog('logout')}>
                            <Dialog.Title>Alert</Dialog.Title>
                            <Dialog.Content>
                                <Text variant="bodyMedium">Are you sure to Logout?</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={handleLogout}>Ok</Button>
                                <Button onPress={() => hideDialog('logout')}>Cancel</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>

                    {/* Card container, header */}
                    <View style={[card.container, card.shadowProp]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
                                <Text style={card.title}>Juan Pet Hotel</Text>
                                {/* Tombol ini muncul harusnya dinamis dari data yg didapat */}
                                <Button style={ styles.buttonActive } theme={{ colors: { primary: 'gray' } }} mode='contained' onPress={() => showDialog('status')}>Active</Button>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                            <Text style={card.balance}>Balance</Text>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Text style={card.balance}>Rp. 2.500.000</Text>
                                <TouchableHighlight style={{ height: 23, width: 23, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }}>
                                    <FontAwesome name="minus" size={20} color="white" />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>

                    {/* Card container, body */}
                    <View style={[card.container, card.shadowProp]}>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Text style={styles.menuTitle}>Settings</Text>
                            <View style={styles.horizontalMarker}></View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Text style={styles.menuTitle}>Bookings</Text>
                            <View style={styles.horizontalMarker}></View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Admin Chat List Stack')}>
                            <Text style={styles.menuTitle}>Chats</Text>
                            <View style={styles.horizontalMarker}></View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => showDialog('logout')}>
                            <Text style={styles.menuTitle}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    menuTitle: {
        fontSize: 18,
        marginTop: 12,
        marginBottom: 12
    },
    menuRow: {

    },
    horizontalMarker: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 12,
        elevation: 2,
        opacity: 0.4
    },
    buttonActive: {
        borderRadius: 5,
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
        fontWeight: '600'
    },
    balance: {
        fontSize: 16,
        fontWeight: '500'
    }
})