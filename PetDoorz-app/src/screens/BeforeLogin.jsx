import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import { Button } from 'react-native-paper'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'

export default function BeforeLogin({ navigation }) {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    (async () => {      
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })();
  }, []);


  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={{ width: 200, height: 250, objectFit: 'contain' }} />
      <View style={{ flexDirection: 'row' }}>
        <Button mode='contained' onPress={() => navigation.navigate('Customer Login')} style={{ marginEnd: 20 }} theme={{ colors: { primary: '#48034F' } }}>Customer</Button>
        <Button mode='contained' onPress={() => navigation.navigate('Admin Login')} theme={{ colors: { primary: '#48034F' } }}>Admin</Button>
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
    justifyContent: 'center',
    marginBottom: 30
  },
});
