import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import store from './src/store'
import MainNavigator from './src/navigators/MainNavigator'

export default function App() {
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
