import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import * as TalkRn from "@talkjs/expo";
import axios from "axios";
const accessToken = "sk_test_BpApDeqY7UA6zWRbSRR6SrwzGdEDOE4h";
const userId = "customer11223344";

export default async function ChatList(props) {
  const role = useSelector((state) => state.user.role);

  return (
    <View>
      <>
        <Text>[{conversationIds}]</Text>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
