import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Image } from 'react-native'
import { Button, Dialog, Portal, PaperProvider, ActivityIndicator } from 'react-native-paper'
import { FontAwesome, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SET_ROLE } from '../../../store/actions/actionUser'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { detailAdmin } from '../../../store/actions/actionAdmin'
import { updateStatusHotel } from '../../../store/actions/actionHotel'


export default function AdminSetting({ navigation }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    const detail = useSelector((state) => state.admin.detailAdmin)


    const currency = (value) => {
        const currency = new Intl.NumberFormat('id-Id', { style: 'currency', currency: 'IDR' }).format(value)
        return currency.split(',')[0]
    }

    useFocusEffect(
        useCallback(() => {
            setLoading(true)
            AsyncStorage.getItem('admin_access_token')
                .then((result) => {
                    dispatch(detailAdmin(result))
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                })

        }, [])
    )

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

    const handleStatusHotel = async () => {
        const access_token = await AsyncStorage.getItem('admin_access_token')
        dispatch(updateStatusHotel(access_token))
            .then((result) => {
                console.log(result)
                return dispatch(detailAdmin(access_token))
            })
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally((_) => {
                setVisible(false)
            })
    }

    if (loading) {
        return <View style={{ justifyContent: 'center', flex: 1 }}>
            <ActivityIndicator size={'large'}></ActivityIndicator>
        </View>
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
                                <Text variant="bodyMedium">Set hotel to {detail.status == 'active' ? 'Inactive' : 'Active'}?</Text>
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
                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', marginTop: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Image source={{ uri: detail.logoHotel }} style={styles.imageRound} />
                            </View>
                            <View style={{ flex: 3 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
                                    <Text style={card.title}>{detail.name}</Text>
                                    <Button onPress={() => showDialog('status')} mode='contained' style={{ borderRadius: 5 }} theme={{ colors: { primary: "#48034F" } }}>{
                                        detail.status === 'active' ? 'Inactive' : 'Active'
                                    }</Button>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>
                                    <Text style={card.balance}>Balance</Text>
                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        <Text style={card.balance}>{currency(detail.balance)}</Text>
                                        <TouchableHighlight style={{ height: 23, width: 23, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }}>
                                            <FontAwesome name="minus" size={20} color="white" />
                                        </TouchableHighlight>
                                    </View>
                                </View>

                            </View>
                        </View>

                    </View>

                    {/* Card container, body */}
                    <View style={[card.container, card.shadowProp]}>
                        <TouchableOpacity activeOpacity={0.8}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Ionicons name="settings-sharp" size={26} color="#48034F" />
                                <Text style={styles.menuTitle}>Settings</Text>
                            </View>
                            <View style={styles.horizontalMarker}></View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Admin Books Stack', {

                        })}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Ionicons name="receipt" size={26} color="#48034F" />
                                <Text style={styles.menuTitle}>Bookings</Text>
                            </View>
                            <View style={styles.horizontalMarker}></View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Admin Chat List Stack')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Ionicons name="chatbubble-ellipses-sharp" size={26} color="#48034F" />
                                <Text style={styles.menuTitle}>Chats</Text>
                            </View>
                            <View style={styles.horizontalMarker}></View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => showDialog('logout')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <MaterialIcons name="logout" size={26} color="#48034F" />
                                <Text style={styles.menuTitle}>Logout</Text>
                            </View>
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
    },
    imageRound: {
        width: 68,
        height: 68,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#48034F'
    },
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
        color: "#48034F"
    },
    balance: {
        fontSize: 16,
        fontWeight: '500'
    }
})