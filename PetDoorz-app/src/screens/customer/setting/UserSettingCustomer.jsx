import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Image } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_ROLE } from '../../../store/actions/actionUser';
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react';
import { detailCustomer } from '../../../store/actions/actionCustomer';

export default function UserSettingCustomer({ navigation }) {
  const dispatch = useDispatch()
  const detail = useSelector((state) => state.customer.detailCustomer)
  const [loading, setLoading] = useState(true)

  const currency = () => {
    return new Intl.NumberFormat('id-Id', { style: 'currency', currency: 'IDR' }).format(detail.balance)
  }

  const handleLogout = async () => {
    await AsyncStorage.clear()
    dispatch(SET_ROLE(''))
  }

  useFocusEffect(
    useCallback(() => {

      AsyncStorage.getItem('customer_access_token')
        .then((result) => {
          dispatch(detailCustomer(result))
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
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
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
                  <Text style={card.balance}>{currency()}</Text>
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
            <Text style={styles.menuTitle}>Settings</Text>
            <View style={styles.horizontalMarker}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Customer Books')}>
            <Text style={styles.menuTitle}>Bookings</Text>
            <View style={styles.horizontalMarker}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.menuTitle}>Favorites</Text>
            <View style={styles.horizontalMarker}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Customer Chat List')}>
            <Text style={styles.menuTitle}>Chats</Text>
            <View style={styles.horizontalMarker}></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={handleLogout}>
            <Text style={styles.menuTitle}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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