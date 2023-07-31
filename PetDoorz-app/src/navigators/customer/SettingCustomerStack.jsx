import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserSettingCustomer from '../../screens/customer/setting/UserSettingCustomer'
import ChatCustomer from '../../screens/customer/setting/ChatCustomer'
import BooksCustomer from '../../screens/customer/setting/BooksCustomer'
import BookDetail from '../../screens/customer/setting/BookDetail'
import ChatListCustomer from '../../screens/customer/setting/ChatListCustomer'

const Stack = createNativeStackNavigator()

export default function SettingCustomerStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="User Setting Home" component={UserSettingCustomer} options={{ headerShown: false }} />
            <Stack.Screen name="Customer Chat" component={ChatCustomer} options={{ headerShown: false }} />
            <Stack.Screen name="Customer Chat List" component={ChatListCustomer} options={{ headerShown: false }} />
            <Stack.Screen name="Customer Books" component={BooksCustomer} options={{ headerShown: false }} />
            <Stack.Screen name="Customer Book Detail" component={BookDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}