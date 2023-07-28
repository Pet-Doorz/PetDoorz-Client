import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper';

export default function UserSettingCustomer() {
  return (
    <SafeAreaView style={ styles.container }>
      <ScrollView>
        <View>
            <Text>User Setting Customer</Text>
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
