import { StatusBar } from 'expo-status-bar'
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import DatePicker from 'react-native-date-picker'

export default function ListHotelCustomer() {
  const [checkin, setCheckin] = useState(new Date()) // ini buat tanggal
  const [checkout, setCheckout] = useState(new Date())
  const [open, setOpen] = useState(false) // buka tutup modal


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <DatePicker
          modal
          open={open}
          date={checkin}
          onConfirm={(date) => {
            setOpen(false)
            setCheckin(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />
        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
          <Text>Disini loh</Text>
          <Text>Check In</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
            <TextInput disabled style={{ flex: 1, height: 45 }}>{checkin.toLocaleDateString()}</TextInput>
            <Button mode='contained' style={{ height: 45 }} onPress={() => setOpen(true)} >Pick Date</Button>
          </View>
          <Text>Check Out</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TextInput disabled style={{ flex: 1, height: 45 }}></TextInput>
            <Button mode='contained' style={{ height: 45 }}>Pick Date</Button>
          </View>
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
  }
})
