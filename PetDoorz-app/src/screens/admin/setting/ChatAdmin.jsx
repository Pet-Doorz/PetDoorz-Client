import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import * as TalkRn from "@talkjs/expo";
import { useEffect } from "react";

export default function ChatAdmin({ route }) {
  const role = useSelector((state) => state.user.role);
  const senderId = route.params?.data;
  const photo = route.params?.photo;
  const myEmail = route.params?.myEmail;

  useEffect(() => {
    console.log(senderId, myEmail);
  }, []);

  const me = {
    id: `${myEmail}`,
    name: `${myEmail}`,
    email: `${myEmail}`,
    photoUrl: photo || "https://talkjs.com/images/avatar-1.jpg",
    welcomeMessage: "Hey there! How are you? :-)",
    role: "default",
  };

  const other = {
    id: `${senderId}`,
    name: `${senderId}`,
    email: `${senderId}@example.com`,
    photoUrl: "henry.jpeg",
    welcomeMessage: "Hello!",
    role: "customer",
  };

  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other)
  );

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  return (
    <TalkRn.Session appId="t15249fa" me={me}>
      <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
    </TalkRn.Session>
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
