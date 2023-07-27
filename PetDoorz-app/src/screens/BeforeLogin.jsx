import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

export default function BeforeLogin() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Before Login!</Text>
      <View style={{ flexDirection: 'row' }}>
        <Button mode='contained' onPress={() => console.log("hello world")}>Customer</Button>
        <Button mode='contained' onPress={() => console.log("hello world")}>Admin</Button>
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
