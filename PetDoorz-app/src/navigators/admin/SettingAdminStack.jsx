import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminSetting from '../../screens/admin/setting/AdminSetting'
import ChatListAdmin from '../../screens/admin/setting/ChatListAdmin'
import ChatAdmin from '../../screens/admin/setting/ChatAdmin'

const Stack = createNativeStackNavigator()

export default function SettingAdminStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home Admin Stack" component={AdminSetting} options={{ headerShown: false }} />
            <Stack.Screen name="Admin Chat List Stack" component={ChatListAdmin} options={{ headerShown: false }} />
            <Stack.Screen name="Admin Chat Stack" component={ChatAdmin} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}