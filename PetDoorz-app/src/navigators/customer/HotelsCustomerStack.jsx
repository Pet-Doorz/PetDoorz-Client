import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListHotelCustomer from '../../screens/customer/hotels/ListHotelCustomer'

const Stack = createNativeStackNavigator()

export default function HotelsCustomerStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Hotels Home" component={ListHotelCustomer} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}