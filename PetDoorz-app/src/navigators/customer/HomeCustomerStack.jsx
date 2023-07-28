import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeCustomer from '../../screens/customer/home/HomeCustomer'

const Stack = createNativeStackNavigator()

export default function HomeCustomerStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home Admin" component={HomeCustomer} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}