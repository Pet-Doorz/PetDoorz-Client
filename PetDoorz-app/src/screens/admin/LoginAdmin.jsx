import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';

export default function LoginAdmin() {
  const hotel = useSelector((state) => state.hotel.data)

  console.log(hotel)

  return (
    <View style={styles.container}>
      <Text>Login admin!</Text>
      <StatusBar style="auto" />
    </View>
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
