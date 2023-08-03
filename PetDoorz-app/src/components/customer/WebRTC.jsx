import { WebView } from "react-native-webview";
import { registerGlobals } from "react-native-webrtc";

const bypass = () => {
  registerGlobals();
  window.RTCPeerConnection.prototype.addTrack = () => {};
  window.RTCPeerConnection.prototype.getSenders = () => {};
  window.location = { protocol: "https:" };
};

const DemoApp = () => {
  bypass();
  return (
    <SafeAreaView>
      {!authed && (
        <View>
          <Text>App ID</Text>
          <TextInput onChangeText={(value) => setAppId(value)} value={appId} />
          <Text>User ID</Text>
          <TextInput
            onChangeText={(value) => setUserId(value)}
            value={userId}
          />
          <Text>Access Token</Text>
          <TextInput
            onChangeText={(value) => setAccessToken(value)}
            value={accessToken}
          />
          <Button title="LOGIN" onPress={login} />
        </View>
      )}
      {authed && (
        <>
          <WebView
            source={{
              uri: "SERVER_URL" + `/?q=${authQuery}&playsinline=1`,
            }}
            originWhitelist={["*"]}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            allowFileAccess={true}
          />
          <Button title="LOGOUT" onPress={logout} />
        </>
      )}
    </SafeAreaView>
  );
};
export default DemoApp;
