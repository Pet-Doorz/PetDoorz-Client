import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import AdminStack from './HomeAdminStack';
import SettingAdminStack from './SettingAdminStack';
const Tab = createBottomTabNavigator();

export default function AdminTab() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: '#2F0036',
            },
            tabBarActiveTintColor: '#f5c618',
            headerStyle: { backgroundColor: '#2F0036' },
            headerTitleStyle: { color: 'white' }
        }}>
            <Tab.Screen name="Home Tab" component={AdminStack} options={{
                headerTitle: 'Pet Doorz', tabBarLabel: 'Home', tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={30} />
                ),
            }} />
            <Tab.Screen name="Setting Tab" component={SettingAdminStack} options={{
                headerTitle: 'Pet Doorz', tabBarLabel: 'User', tabBarIcon: ({ color }) => (
                    <FontAwesome name="user" size={30} color={color} />
                ),
            }} />
        </Tab.Navigator>
    )
}