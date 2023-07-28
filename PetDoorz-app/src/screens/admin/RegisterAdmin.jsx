import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

export default function RegisterAdmin({ navigation }) {
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
      <ScrollView style={{ marginTop: 100 }} contentContainerStyle={{ alignContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Hotel Register</Text>
        <TextInput label='Email' style={styles.textInput}></TextInput>
        <TextInput label='Password' secureTextEntry={eye ? false : true} style={styles.textInput} right={<TextInput.Icon icon="eye" onPress={handleEye} />}></TextInput>
        <TextInput label='Hotel Name' style={styles.textInput}></TextInput>
        <TextInput label='Hotel Logo' style={styles.textInput}></TextInput>
        <Button mode='contained' theme={{ colors: { primary: '#48034F' } }}>Register</Button>
        <View >
          <Text style={{ marginTop: 15 }}>Already sign up?</Text>
          <Button style={{ marginTop: 0 }} onPress={() => navigation.navigate('Admin Login')}>Login</Button>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
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
