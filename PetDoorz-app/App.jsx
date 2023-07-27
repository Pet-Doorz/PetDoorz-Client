import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import AdminTab from './src/navigators/admin/AdminTab'
import { useState } from 'react';
import LoginRegisterStack from './src/navigators/LoginRegisterStack';
import CustomerTab from './src/navigators/customer/CustomerTab';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isCustomer, setIsCustomer] = useState(true)

  return (
    <NavigationContainer>
      {
        isAdmin ? (
          <AdminTab />
        ) : isCustomer ? (
          <CustomerTab />
        ) : (
          <LoginRegisterStack />
        )
      }
    </NavigationContainer>
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
