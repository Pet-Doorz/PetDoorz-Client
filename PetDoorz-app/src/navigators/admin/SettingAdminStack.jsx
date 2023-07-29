import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminSetting from '../../screens/admin/setting/AdminSetting'

const Stack = createNativeStackNavigator()

export default function SettingAdminStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home Admin Stack" component={AdminSetting} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}