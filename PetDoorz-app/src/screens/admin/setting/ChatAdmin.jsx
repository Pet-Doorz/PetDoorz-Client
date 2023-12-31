import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import * as TalkRn from "@talkjs/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function ChatAdmin({ route }) {
  const role = useSelector((state) => state.user.role);
  const senderId = route.params?.data;
  const photo = route.params?.photo;
  const myEmail = route.params?.myEmail;
  const [customerEmail, setCustomerEmail] = useState("");

  useFocusEffect(
    useCallback(() => {
      console.log(senderId, "<----------");
      AsyncStorage.getItem("admin_email")
        .then((result) => {
          const custEmail = result;
          setCustomerEmail(custEmail);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])
  );

  const me = {
    id: customerEmail ? `${customerEmail}` : "loading",
    name: customerEmail ? `${customerEmail}` : "loading",
    email: customerEmail ? `${customerEmail}` : "loading",
    photoUrl: photo || "https://talkjs.com/images/avatar-1.jpg",
    welcomeMessage: "Hey there! How are you? :-)",
    role: "customer",
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
