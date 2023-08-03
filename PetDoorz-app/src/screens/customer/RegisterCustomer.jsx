import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile } from "../../../lib/imagekit"
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import { registerCustomer } from '../../store/actions/actionCustomer'

export default function RegisterCustomer({ navigation }) {
  const dispatch = useDispatch()
  
  const [eye, setEye] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  async function handleRegister() {
    // console.log(email, password, name, formatLongLat(),
    //   logo, description, address, phoneNumber, images, imageFiles)
    
    let formData = { email, password, fullName: name, phoneNumber }
    console.log(formData)

    dispatch(registerCustomer(formData))
    // .then(() => {
    //     dispatch(detailAdmin())
    // })
    .then((res) => {
        navigation.navigate('Customer Login')
    })
    .catch((error) => {
      console.log(error)
    })

  }

  const handleEye = () => {
    if (eye) {
      setEye(false)
    } else {
      setEye(true)
    }
  }

  return (
    <ScrollView style={{ marginTop: 100 }} contentContainerStyle={{ alignContent: 'center', alignItems: 'center', paddingHorizontal: "6%" }}>
      <Text style={{ fontSize: 20, marginBottom: 40 }}>Customer Register</Text>
      <TextInput label='Email' style={styles.textInput} onChangeText={email => setEmail(email)}></TextInput>
      <TextInput label='Password' onChangeText={password => setPassword(password)} secureTextEntry={eye ? false : true} style={styles.textInput} right={<TextInput.Icon icon="eye" onPress={handleEye} />}></TextInput>
      <TextInput label='Full Name' onChangeText={name => setName(name)} style={styles.textInput}></TextInput>
      <TextInput label='Phone Number' onChangeText={phoneNumber => setPhoneNumber(phoneNumber)} style={styles.textInput}></TextInput>

      <Button mode='contained' theme={{ colors: { primary: '#48034F' } }} onPress={handleRegister} style={{ marginTop: 40 }}>Register</Button>
      <View style={{marginBottom: 50}}>
        <Text style={{ marginTop: 15 }}>Already sign up?</Text>
        <Button style={{ marginTop: 0 }} onPress={() => navigation.navigate('Customer Login')}>Login</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: "100%",
    marginBottom: 20
  },
  imageInput: {
    flex: 2
  },
  map: {
    width: "100%",
    height: 250,
    marginBottom: 20
  }
});
