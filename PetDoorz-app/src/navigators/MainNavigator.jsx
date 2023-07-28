import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import AdminTab from './admin/AdminTab'
import CustomerTab from './customer/CustomerTab'
import LoginRegisterStack from './LoginRegisterStack'
import { useSelector } from 'react-redux'

export default function MainNavigator() {
    const role = useSelector(state => state.user.role)

    return (
        <NavigationContainer>
            {
                role === 'admin' ? (
                    <AdminTab />
                ) : role === 'customer' ? (
                    <CustomerTab />
                ) : (
                    <LoginRegisterStack />
                )
            }
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
