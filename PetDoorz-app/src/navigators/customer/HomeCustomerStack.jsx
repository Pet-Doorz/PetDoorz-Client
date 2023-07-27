import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeCustomer from '../../screens/customer/HomeCustomer'

const Stack = createNativeStackNavigator()

export default function HomeCustomerStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home Admin Stack" component={HomeCustomer} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}