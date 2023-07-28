import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import AdminTab from './src/navigators/admin/AdminTab'
import { useState } from 'react';
import LoginRegisterStack from './src/navigators/LoginRegisterStack'
import CustomerTab from './src/navigators/customer/CustomerTab'
import { Provider } from 'react-redux'
import store from './src/store'
import MainNavigator from './src/navigators/MainNavigator';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(true)
  const [isCustomer, setIsCustomer] = useState(false)

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
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
