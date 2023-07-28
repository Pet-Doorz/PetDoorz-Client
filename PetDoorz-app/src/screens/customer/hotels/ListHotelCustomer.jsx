import { StatusBar } from 'expo-status-bar'
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useSelector } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'

export default function ListHotelCustomer() {
  const date = new Date() // dapetin tanggal

  const [checkin, setCheckin] = useState(date) // ini buat tanggal
  const [checkout, setCheckout] = useState(date) //ini tanggal checkout

  const hotels = useSelector((state) => state.hotel.data)

  const handleCheckinDate = () => {
    DateTimePickerAndroid.open({
      value: checkin,
      onChange: (_, selectedDate) => setCheckin(selectedDate),
      mode: 'date',
      is24Hour: true,
      minimumDate: date
    });
  }

  const handleCheckoutDate = () => {
    DateTimePickerAndroid.open({
      value: checkout,
      onChange: (_, selectedDate) => setCheckout(selectedDate),
      mode: 'date',
      is24Hour: true,
      minimumDate: date
    });
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.grid}>
          <Text style={styles.title}>Find Hotel</Text>

          <Text>Check In</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
            <TextInput disabled style={{ flex: 1, height: 45 }}>{checkin.toLocaleDateString('checkin')}</TextInput>
            <Button mode='contained' style={{ height: 45 }} onPress={handleCheckinDate} >Pick Date</Button>
          </View>
          <Text>Check Out</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TextInput disabled style={{ flex: 1, height: 45 }}>{checkout.toLocaleDateString()}</TextInput>
            <Button mode='contained' style={{ height: 45 }} onPress={handleCheckoutDate}>Pick Date</Button>
          </View>

          <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row' }}>
            <TextInput style={{ flex: 1 }} label={'Total Pet '} mode='outlined' keyboardType='numeric' />
          </View>

          <Button mode='contained'>Find</Button>
        </View>


        <View style={styles.grid}>{/* List seluruh hotelnya */}
          <Text style={styles.title}>List Hotel</Text>

          {
            hotels.map((e) => {
              return (
                <View key={e.id} style={{ height: 80, backgroundColor: '#6B51AA', marginBottom: 10, padding: 10, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>{e.name}</Text>
                    <Text style={{ fontSize: 13, color: 'white', marginTop: 10 }}>{e.address}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 17 }}>
                    <FontAwesome name="star" size={24} color="yellow" />
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}> 4 / 5</Text>
                  </View>
                </View>
              )
            })
          }

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
  screen: {
    paddingHorizontal: 10,
    marginTop: 20
  },
  button: {
    height: 75,
    justifyContent: 'center',
    borderRadius: 18
  },
  grid: { paddingHorizontal: 15, marginTop: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 }
})
