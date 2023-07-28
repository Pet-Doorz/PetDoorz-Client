import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserSettingCustomer from '../../screens/customer/setting/UserSettingCustomer'
import ChatCustomer from '../../screens/customer/setting/ChatCustomer'

const Stack = createNativeStackNavigator()

export default function SettingCustomerStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="User Setting Home" component={UserSettingCustomer} options={{ headerShown: false }} />
            <Stack.Screen name="Customer Chat" component={ChatCustomer} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}