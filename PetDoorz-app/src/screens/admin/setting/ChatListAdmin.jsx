import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
const baseUrl = `https://api.talkjs.com/v1/t15249fa/users`;

let emailCust;
export default function ChatListAdmin({ navigation }) {
  const [customerData, setCustomerData] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCustomer() {
    try {
      emailCust = await AsyncStorage.getItem("admin_email");
      const { data } = await axios({
        method: "get",
        url: `https://api.talkjs.com/v1/t15249fa/users/${emailCust}/conversations`,
        headers: {
          Authorization: `Bearer sk_test_BpApDeqY7UA6zWRbSRR6SrwzGdEDOE4h`,
        },
      });
      const filteredData = await data.data.filter(
        (entry) => entry.lastMessage !== null
      );
      setChatHistory(filteredData);
      return filteredData;
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getCustomer()
        .then((data) => {
          setLoading(true);
          const transformedData = data.map((entry) => {
            return entry.participants;
          });
          // console.log(JSON.stringify(data, null, 4));
          return transformedData;
        })
        .then((res) => {
          setChatList(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Chat List</Text>

        {chatHistory.length <= 0 && (
          <TouchableOpacity activeOpacity={0.8}>
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
              <View>
                <Text style={styles.chatName}>No Chat History</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {chatHistory.length > 0 &&
          chatHistory.map((chat, index) => {
            return (
              <TouchableOpacity
                key={chat.id}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("Admin Chat Stack", {
                    data: chatList[index]
                      ? Object.keys(chatList[index])[0] != emailCust
                        ? Object.keys(chatList[index])[0]
                        : Object.keys(chatList[index])[1]
                      : "loading name",
                    photo: chat.photoUrl ? chat.photoUrl : "Loading Photo...",
                  })
                }
              >
                <View
                  style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}
                >
                  <Image
                    source={{
                      uri:
                        chat.photoUrl ||
                        "https://i.scdn.co/image/ab6761610000517492c8095c788abfd2de4a90ee",
                    }}
                    style={styles.imageRound}
                  />
                  <View>
                    <Text style={styles.chatName}>
                      {chatList[index]
                        ? Object.keys(chatList[index])[0] != emailCust
                          ? Object.keys(chatList[index])[0]
                          : Object.keys(chatList[index])[1]
                        : "loading name"}
                    </Text>
                    <Text>
                      {chat.lastMessage ? chat.lastMessage.text : "No Reply"}
                      ...
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  imageRound: {
    width: 68,
    height: 68,
    borderRadius: 100,
  },
  chatName: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "600",
  },
});
