import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeCustomerStack from './HomeCustomerStack';
import HotelsCustomerStack from './HotelsCustomerStack';
import SettingCustomerStack from './SettingCustomerStack';

const Tab = createBottomTabNavigator();

export default function CustomerTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Customer Tab" component={HomeCustomerStack} options={{ headerTitle: 'Pet Doorz' }} />
            <Tab.Screen name="Hotel List Tab" component={HotelsCustomerStack} options={{ headerTitle: 'Pet Doorz' }} />
            <Tab.Screen name="Setting List Tab" component={SettingCustomerStack} options={{ headerTitle: 'Pet Doorz' }} />
        </Tab.Navigator>
    )
}