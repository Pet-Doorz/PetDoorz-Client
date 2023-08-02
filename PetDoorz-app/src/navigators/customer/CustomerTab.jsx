import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import HomeCustomerStack from './HomeCustomerStack';
import HotelsCustomerStack from './HotelsCustomerStack';
import SettingCustomerStack from './SettingCustomerStack';

const Tab = createBottomTabNavigator();

export default function CustomerTab() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: '#48034F',
            },
            tabBarActiveTintColor: '#f5c618',
            headerStyle: { backgroundColor: '#48034F' },
            headerTitleStyle: { color: 'white' }
        }}>
            <Tab.Screen name="Customer Tab" component={HomeCustomerStack} options={{
                headerTitle: 'Pet Doorz', tabBarLabel: 'Home', tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={30} />
                ),
            }} />
            <Tab.Screen name="Hotel List Tab" component={HotelsCustomerStack} options={{
                headerTitle: 'Pet Doorz', tabBarLabel: 'Hotel', tabBarIcon: ({ color }) => (
                    <MaterialIcons name="pets" size={30} color={color} />
                ),
            }} />
            <Tab.Screen name="Setting List Tab" component={SettingCustomerStack} options={{
                headerTitle: 'Pet Doorz', tabBarLabel: 'User', tabBarIcon: ({ color }) => (
                    <FontAwesome name="user" size={30} color={color} />
                ),
            }} />
        </Tab.Navigator>
    )
}