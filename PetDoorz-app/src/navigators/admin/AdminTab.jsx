import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import AdminStack from './HomeAdminStack';
const Tab = createBottomTabNavigator();

export default function AdminTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home Tab" component={AdminStack} options={{ headerTitle: 'Pet Doorz' }} />
            <Tab.Screen name="Admin Tab" component={AdminStack} />
        </Tab.Navigator>
    )
}