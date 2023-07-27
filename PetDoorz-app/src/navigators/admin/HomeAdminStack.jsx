import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeAdmin from '../../screens/admin/HomeAdmin'

const Stack = createNativeStackNavigator()

export default function HomeAdminStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home Admin Stack" component={HomeAdmin} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}