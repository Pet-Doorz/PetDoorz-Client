import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'

export default function BeforeLogin() {
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
      <Text>Before Login!</Text>
      <Text>{text}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Button mode='contained' onPress={() => console.log(location.coords.latitude, location.coords.longitude)}>Customer</Button>
        <Button mode='contained' onPress={() => console.log(errorMsg)}>Admin</Button>
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
  },
});
