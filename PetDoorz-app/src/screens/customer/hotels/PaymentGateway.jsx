import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview'

export default function PaymentGateway({ route }) {
    const { url } = route.params
    return (
        <WebView source={{ uri: url }} style={{ flex: 1 }} />
    )
}