import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview'

export default function PaymentGateway({ route, navigation }) {
    const { redirect_url } = route.params
    const handleWebViewNavigationStateChange = (newNavState) => {
        const { url } = newNavState
        if (url.split('/?')[0] === 'http://example.com') {
            navigation.navigate('User Setting Home')
        }
        // if (url.split('/')[7] === 'success') {
        //     navigation.navigate('User Setting Home')
        // }
    }

    return (
        <WebView source={{ uri: redirect_url }} style={{ flex: 1 }} onNavigationStateChange={handleWebViewNavigationStateChange}/>
    )
}