import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginAdmin from '../screens/admin/LoginAdmin'
import RegisterAdmin from '../screens/admin/RegisterAdmin'
import BeforeLogin from '../screens/BeforeLogin'
import LoginCustomer from '../screens/customer/LoginCustomer'
import RegisterCustomer from '../screens/customer/RegisterCustomer'

const Stack = createNativeStackNavigator()

export default function LoginRegisterStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Before Login"  component={BeforeLogin} options={{ headerShown: false }} />
            <Stack.Screen name="Admin Login"  component={LoginAdmin} options={{ headerShown: false }} />
            <Stack.Screen name="Admin Register"  component={RegisterAdmin} options={{ headerShown: false }} />
            <Stack.Screen name="Customer Login"  component={LoginCustomer} options={{ headerShown: false }} />
            <Stack.Screen name="Customer Register"  component={RegisterCustomer} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}