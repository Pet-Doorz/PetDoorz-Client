import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import AdminTab from './admin/AdminTab'
import CustomerTab from './customer/CustomerTab'
import LoginRegisterStack from './LoginRegisterStack'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { SET_ROLE } from '../store/actions/actionUser'
import { ActivityIndicator } from 'react-native-paper'

export default function MainNavigator() {
    const role = useSelector(state => state.user.role)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    // handle auto login dengan get access token
    const handleAutoLogin = async () => {
        setLoading(true)
        const customer = await AsyncStorage.getItem('customer_access_token') // get customer access token
        const admin = await AsyncStorage.getItem('admin_access_token') // get admin access token
        if (customer) {
            dispatch(SET_ROLE('customer'))
        } else if (admin) {
            dispatch(SET_ROLE('admin'))
        }
        setLoading(false)
    }

    useEffect(() => {
        handleAutoLogin()
    }, [])

    if (loading) return (
        <View style={styles.container   }>
            <ActivityIndicator size={'large'} />
        </View>
    )

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
