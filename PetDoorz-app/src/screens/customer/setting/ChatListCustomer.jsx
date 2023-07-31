import { useEffect, useState, useCallback } from "react";
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

const baseUrl = `https://api.talkjs.com/v1/t15249fa/users`;
export default function ChatListCustomer({ navigation }) {
  const [customerData, setCustomerData] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  async function getCustomer() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${baseUrl}/test@customer.com/conversations`,
        headers: {
          Authorization: `Bearer sk_test_BpApDeqY7UA6zWRbSRR6SrwzGdEDOE4h`,
        },
      });
      setChatHistory(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    AsyncStorage.getItem("customer_email")
      .then((result) => {
        const emailCust = result;
        setCustomerData(emailCust);
        getCustomer();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      getCustomer();
    }, [])
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Chat List</Text>

        {chatHistory.length <= 0 && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Customer Chat")}
          >
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
              <View>
                <Text style={styles.chatName}>No Chat History</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {!chatHistory.length <= 0 &&
          chatHistory.map((chat) => {
            return (
              <TouchableOpacity
                key={chat.id}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("Customer Chat", {
                    data: chat.lastMessage.senderId,
                    photo: chat.photoUrl,
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
                      {chat.lastMessage.senderId}
                    </Text>
                    <Text>{chat.lastMessage.text}...</Text>
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
