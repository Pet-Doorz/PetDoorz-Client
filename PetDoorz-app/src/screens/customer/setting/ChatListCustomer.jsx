import { useEffect, useState } from "react";
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
const baseUrl = `https://api.talkjs.com/v1/t15249fa/users`;
export default function ChatListCustomer({ navigation }) {
  const [customerData, setCustomerData] = useState({
    email: "",
  });

  async function getCustomer() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${baseUrl}/${customerData.email}/conversations`,
        headers: {
          Authorization: `Bearer sk_test_BpApDeqY7UA6zWRbSRR6SrwzGdEDOE4h`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCustomer()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Chat List</Text>

        {/* Chat List */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Customer Chat")}
        >
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
            <Image
              source={{
                uri: "https://i.scdn.co/image/ab6761610000517492c8095c788abfd2de4a90ee",
              }}
              style={styles.imageRound}
            />
            <View>
              <Text style={styles.chatName}>Leonardo Ringo</Text>
              <Text>...</Text>
            </View>
          </View>
        </TouchableOpacity>
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
