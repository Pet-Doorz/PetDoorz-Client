import { StatusBar } from "expo-status-bar";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getFilteredHotel } from "../../../store/actions/actionHotel";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListHotelCustomer({ navigation }) {
  const date = new Date(); // dapetin tanggal
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [checkin, setCheckin] = useState(date); // ini buat tanggal
  const [checkout, setCheckout] = useState(date); //ini tanggal checkout
  const hotels = useSelector((state) => state.hotel.data);
  const locations = useSelector((state) => state.user.location);
  const dispatch = useDispatch();
  const handleCheckinDate = () => {
    DateTimePickerAndroid.open({
      value: checkin,
      onChange: (_, selectedDate) => setCheckin(selectedDate),
      mode: "date",
      is24Hour: true,
      minimumDate: date,
    });
  };

  const handleCheckoutDate = () => {
    DateTimePickerAndroid.open({
      value: checkout,
      onChange: (_, selectedDate) => setCheckout(selectedDate),
      mode: "date",
      is24Hour: true,
      minimumDate: date,
    });
  };

  const handleDetailScreen = (id) => {
    navigation.navigate("Hotel Detail", {
      name: "Test",
      id
    });
  };

  const fetchFilteredHotel = async () => {
    setLoading(true);
    try {
      const long = await AsyncStorage.getItem("longitude");
      const lat = await AsyncStorage.getItem("latitude");
      dispatch(
        //distance, total pet masih hardcode
        getFilteredHotel({
          distance: Infinity,
          long: +lat,
          lat: +long,
          checkin: checkin.toLocaleDateString("en-GB"),
          checkout: checkout.toLocaleDateString("en-GB"),
          totalPet: 1,
        })
      )
        .then((_) => {})
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.grid}>
          <Text style={styles.title}>Find Hotel</Text>

          <Text>Check In</Text>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
            <TextInput disabled mode="outlined" style={{ flex: 1, height: 45 }}>
              {checkin.toLocaleDateString("checkin")}
            </TextInput>
            <Button
              mode="contained"
              style={{ height: 45, borderRadius: 8, marginTop: 7 }}
              onPress={handleCheckinDate}
              theme={{ colors: { primary: "#48034F" } }}
            >
              Pick Date
            </Button>
          </View>
          <Text>Check Out</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TextInput disabled mode="outlined" style={{ flex: 1, height: 45 }}>
              {checkout.toLocaleDateString()}
            </TextInput>
            <Button
              mode="contained"
              style={{ height: 45, borderRadius: 8, marginTop: 7 }}
              onPress={handleCheckoutDate}
              theme={{ colors: { primary: "#48034F" } }}
            >
              Pick Date
            </Button>
          </View>

          <View
            style={{ marginTop: 20, marginBottom: 20, flexDirection: "row" }}
          >
            <TextInput
              style={{ flex: 1 }}
              label={"Total Pet "}
              mode="outlined"
              keyboardType="numeric"
            />
          </View>

          <Button
            mode="contained"
            style={{ height: 45, borderRadius: 8 }}
            theme={{ colors: { primary: "#48034F" } }}
            onPress={fetchFilteredHotel}
          >
            Find
          </Button>
        </View>

        <View style={styles.grid}>
          {/* List seluruh hotelnya */}
          <Text style={styles.title}>List Hotel</Text>
          {hotels.length > 0 ? (
            hotels.map((e) => {
              return (
                <TouchableOpacity
                  key={e.id}
                  onPress={() => handleDetailScreen(e.id)}
                  activeOpacity={0.9}
                >
                  <View style={[styles.hotel, styles.shadowProp]}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          color: "white",
                        }}
                      >
                        {e.name}
                      </Text>
                      <Text
                        style={{ fontSize: 13, color: "white", marginTop: 5 }}
                      >
                        Start From: {"IDR " + e.detailRoom[0].price}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: "white",
                          fontWeight: "200",
                        }}
                      >
                        Distance: {e.distance} Km
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 17 }}>
                      <FontAwesome name="star" size={24} color="yellow" />
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          color: "white",
                        }}
                      >
                        {" "}
                        4 / 5
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>
              No hotels found. Kindly check your checkin and checkout then try
              again ❤️
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  screen: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  button: {
    height: 75,
    justifyContent: "center",
    borderRadius: 18,
  },
  grid: { paddingHorizontal: 15, marginTop: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  hotel: {
    height: 80,
    backgroundColor: "#48034F",
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
  },
  shadowProp: {
    elevation: 3,
  },
});
