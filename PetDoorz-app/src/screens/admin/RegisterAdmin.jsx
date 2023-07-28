import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'

export default function RegisterAdmin({ navigation }) {
  const [eye, setEye] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [logo, setLogo] = useState('')
  const [image, setImage] = useState('')

  const userLocation = useSelector((state) => state.user.location)

  const handleRegister = () => {
    console.log(email, password, name, logo, image)
  }

  const [location, setLocation] = useState({})

  useEffect(() => {
    if (userLocation) {
      setLocation({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      })
    }
  }, [userLocation])

  const handleEye = () => {
    if (eye) {
      setEye(false)
    } else {
      setEye(true)
    }
  }

  // if (!userLocation.latitude) {
  //   return (
  //     <View style={ styles.container }>
  //       <Text>No Location Detected!</Text>
  //     </View>
  //   )
  // }

  return (
    <ScrollView style={{ marginTop: 100 }} contentContainerStyle={{ alignContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Hotel Register</Text>
      <TextInput label='Email' style={styles.textInput} onChangeText={email => setEmail(email)}></TextInput>
      <TextInput label='Password' onChangeText={password => setPassword(password)} secureTextEntry={eye ? false : true} style={styles.textInput} right={<TextInput.Icon icon="eye" onPress={handleEye} />}></TextInput>
      <TextInput label='Hotel Name' onChangeText={name => setName(name)} style={styles.textInput}></TextInput>
      <TextInput label='Hotel Logo' onChangeText={logo => setLogo(logo)} style={styles.textInput}></TextInput>
      <TextInput label='Hotel Image' onChangeText={image => setImage(image)} style={styles.textInput}></TextInput>
      {/* <MapView
        style={styles.map}
        region={location}
      >
        <Marker draggable
          coordinate={location}
          onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
        />
      </MapView> */}
      <Button mode='contained' theme={{ colors: { primary: '#48034F' } }} onPress={handleRegister}>Register</Button>
      <View>
        <Text style={{ marginTop: 15 }}>Already sign up?</Text>
        <Button style={{ marginTop: 0 }} onPress={() => navigation.navigate('Admin Login')}>Login</Button>
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
    width: 250,
    marginBottom: 20
  },
  map: {
    width: '90%',
    height: 250
  }
});
