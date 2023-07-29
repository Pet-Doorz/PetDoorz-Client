import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeAdmin from '../../screens/admin/home/HomeAdmin'
import AddRoomAdmin from '../../screens/admin/home/AddRoomAdmin'
import AddServiceAdmin from '../../screens/admin/home/AddServiceAdmin'
import EditDetailRoomAdmin from '../../screens/admin/home/EditDetailRoomAdmin'

const Stack = createNativeStackNavigator()

export default function HomeAdminStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home Admin Stack" component={HomeAdmin} options={{ headerShown: false }} />
            <Stack.Screen name="Add Room Admin" component={AddRoomAdmin} options={{ headerShown: false }} />
            <Stack.Screen name="Add Service Admin" component={AddServiceAdmin} options={{ headerShown: false }} />
            <Stack.Screen name="Edit Room Admin" component={EditDetailRoomAdmin} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}