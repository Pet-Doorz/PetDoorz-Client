import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Image } from 'react-native'
import { ActivityIndicator, Dialog, Portal, PaperProvider, Button } from 'react-native-paper';
import { FontAwesome, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_ROLE } from '../../../store/actions/actionUser';
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react';
import { detailCustomer, getReview } from '../../../store/actions/actionCustomer';

export default function UserSettingCustomer({ navigation }) {
  const dispatch = useDispatch()
  const detail = useSelector((state) => state.customer.detailCustomer)
  const [loading, setLoading] = useState(true)

  const currency = (value) => {
    const currency = new Intl.NumberFormat('id-Id', { style: 'currency', currency: 'IDR' }).format(value)
    return currency.split(',')[0]
  }

  const handleLogout = async () => {
    await AsyncStorage.clear()
    dispatch(SET_ROLE(''))
  }

  const [logout, setLogout] = useState(false)

  const showDialog = () => {
    setLogout(true)
  }

  const hideDialog = () => {
    setLogout(false)
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      AsyncStorage.getItem('customer_access_token')
        .then((result) => {
          dispatch(detailCustomer(result))
            .catch((err) => {
              console.log(err, '<<< detail customer')
            })
            dispatch(getReview(result))
            .catch((err) => {
              console.log(err, '<<< review')
            });
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })

    }, [])
  )

  if (loading) {
    return <View style={{ justifyContent: 'center', flex: 1 }}>
      <ActivityIndicator size={'large'}></ActivityIndicator>
    </View>
  }

  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          {/* Dialog untuk logout */}
          <Portal>
            <Dialog visible={logout} onDismiss={() => hideDialog()}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">Are you sure to Logout?</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleLogout}>Ok</Button>
                <Button onPress={() => hideDialog()}>Cancel</Button>
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
                <Text style={card.title}>{detail.fullName}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 8 }}>
                  <Text style={card.balance}>Balance</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={card.balance}>{currency(detail.balance)}</Text>
                    <TouchableHighlight style={{ height: 23, width: 23, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }}
                      onPress={() => navigation.navigate('Customer Add Balance')}
                    >
                      <FontAwesome name="plus" size={20} color="white" />
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
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Customer Books')}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Ionicons name="receipt" size={26} color="#48034F" />
                <Text style={styles.menuTitle}>Bookings</Text>
              </View>
              <View style={styles.horizontalMarker}></View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <MaterialIcons name="favorite" size={26} color="#48034F" />
                <Text style={styles.menuTitle}>Favorites</Text>
              </View>
              <View style={styles.horizontalMarker}></View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Customer Chat List')}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Ionicons name="chatbubble-ellipses-sharp" size={26} color="#48034F" />
                <Text style={styles.menuTitle}>Chats</Text>
              </View>
              <View style={styles.horizontalMarker}></View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={showDialog}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <MaterialIcons name="logout" size={26} color="#48034F" />
                <Text style={styles.menuTitle}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
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
  horizontalMarker: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 12,
    elevation: 2,
    opacity: 0.4
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
    fontWeight: '500',
    marginEnd: 20
  }
})