import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function BeforeLogin() {
  return (
    <View style={styles.container}>
      <Text>Before Login!</Text>
      <Button title='Login' onPress={() => console.log("hello world")}>Click Me</Button>
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
