import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Image } from 'react-native'
import { Button, Dialog, Portal, PaperProvider, ActivityIndicator } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SET_ROLE } from '../../../store/actions/actionUser'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { detailAdmin } from '../../../store/actions/actionAdmin'


export default function AdminSetting({ navigation }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    const detail = useSelector((state) => state.admin.detailAdmin)


    const currency = () => {
        return new Intl.NumberFormat('id-Id', { style: 'currency', currency: 'IDR' }).format(detail.balance)
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

    const handleStatusHotel = () => {
        // Logic handleStatus Hotel
        console.log('Active hotel!')
        setVisible(false)
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
                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', marginTop: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Image source={{ uri: 'https://freewaysocial.com/wp-content/uploads/2020/02/why-good-facebook-profile-picture-matters-1024x656.png' }} style={styles.imageRound} />
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text style={card.title}>{detail.name}</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>
                                    <Text style={card.balance}>Balance</Text>
                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        <Text style={card.balance}>{currency()}</Text>
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
                            <Text style={styles.menuTitle}>Settings</Text>
                            <View style={styles.horizontalMarker}></View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Admin Books Stack', {

                        })}>
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
    },
    imageRound: {
        width: 68,
        height: 68,
        borderRadius: 100
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
        fontWeight: '600'
    },
    balance: {
        fontSize: 16,
        fontWeight: '500'
    }
})