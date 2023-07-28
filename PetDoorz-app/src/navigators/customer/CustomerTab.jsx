import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeCustomerStack from './HomeCustomerStack';

const Tab = createBottomTabNavigator();

export default function CustomerTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Customer Tab" component={HomeCustomerStack} />
        </Tab.Navigator>
    )
}