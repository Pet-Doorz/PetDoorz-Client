import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeCustomer from '../../screens/customer/home/HomeCustomer'
import UserSettingCustomer from '../../screens/customer/setting/UserSettingCustomer'

const Stack = createNativeStackNavigator()

export default function SettingCustomerStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="User Setting Home" component={UserSettingCustomer} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}