import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListHotelCustomer from '../../screens/customer/hotels/ListHotelCustomer'
import DetailHotelCustomer from '../../screens/customer/hotels/DetailHotelCustomer'
import BookHotelCustomer from '../../screens/customer/hotels/BookHotelCustomer'
import PaymentGateway from '../../screens/customer/hotels/PaymentGateway'

const Stack = createNativeStackNavigator()

export default function HotelsCustomerStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Hotels Home" component={ListHotelCustomer} options={{ headerShown: false }} />
            <Stack.Screen name="Hotel Detail" component={DetailHotelCustomer} options={{ headerShown: false }} />
            <Stack.Screen name="Hotel Book" component={BookHotelCustomer} options={{ headerShown: false }} />
            <Stack.Screen name="Payment Gateway" component={PaymentGateway} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}