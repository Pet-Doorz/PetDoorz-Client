import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import logo from '../../../assets/logo.png'
import { useDispatch } from 'react-redux'
import { SET_ROLE } from '../../store/actions/actionUser'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loginAdmin } from '../../store/actions/actionAdmin'

export default function LoginAdmin({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nullEmPass, setNullEmPass] = useState(false)

  const dispatch = useDispatch()

  const handleLogin = async () => {
    if (!email || !password) {
      setNullEmPass(true)
    } else {
      dispatch(loginAdmin({ email, password }))
        .then(async ({ access_token }) => {
          await AsyncStorage.setItem('admin_access_token', access_token) // setItem (save ke local storage)
          await AsyncStorage.setItem('admin_email', email)
          dispatch(SET_ROLE('admin'))
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }

  const [eye, setEye] = useState(false)

  const handleEye = () => {
    if (eye) {
      setEye(false)
    } else {
      setEye(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image source={logo} style={{ width: 100, height: 150, objectFit: 'contain' }} />
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Hotel Login</Text>
        {
          nullEmPass ? <Text style={{ color: '#D2001A', fontSize: 15, marginBottom: 10 }}>Invalid email/password</Text> : ''
        }
        <TextInput label='Email' style={styles.textInput} onChangeText={email => setEmail(email)}></TextInput>
        <TextInput label='Password' secureTextEntry={eye ? false : true} onChangeText={password => setPassword(password)} style={styles.textInput} right={<TextInput.Icon icon="eye" onPress={handleEye} />}></TextInput>
        <Button mode='contained' theme={{ colors: { primary: '#48034F' } }} onPress={handleLogin}>Login</Button>
        <Button style={{ marginTop: 5 }} onPress={() => navigation.navigate('Admin Register')}>Signup</Button>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
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
  }
});
