import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BookingCard from "../../../components/customer/BookingCard";
import { getHotelById } from "../../../store/actions/actionCustomer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
let perEmail;
let token;
export default function BooksCustomer({ navigation }) {
  const [adminEmail, setAdminEmail] = useState("");
  const bookings = useSelector(
    (state) => state.customer.detailCustomer.Bookings
  );

  const handleBookingDetails = (id) => {
    navigation.navigate("Customer Book Detail", {
      id,
    });
  };
  const getAccessToken = async () => {
    return await AsyncStorage.getItem("customer_access_token");
  };

  useFocusEffect(
    useCallback(() => {
      getAccessToken()
        .then((access_token) => {
          token = access_token;
        })
        .catch((err) => {
          throw err;
        });
    }, [])
  );

  const handleChatHotel = async (id) => {
    try {
      getHotelById({ access_token: token, id })
        .then((perEmail) => {
          setAdminEmail(perEmail);
          return perEmail;
        })
        .then((perEmail) => {
          navigation.navigate("Customer Chat", {
            data: perEmail,
            photo: "asd",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReview = (bookingId, HotelId, hotelName) => {
    navigation.navigate('Add Review', {
      bookingId, HotelId, hotelName
    })
  }

  const handleVidCallHotel = () => { };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Books</Text>
        <View style={{ marginTop: 20 }}>
          {/* List Booking */}
          {bookings.map((e) => {
            return (
              <BookingCard
                key={e.id}
                booking={e}
                handleBookingDetails={handleBookingDetails}
                handleChatHotel={() => handleChatHotel(e.Room.HotelId)}
                handleReview={handleReview}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    borderRadius: 10,
  },
  shadowProp: {
    elevation: 5,
  },
  statusCard: {
    backgroundColor: "gray",
    flexDirection: "row",
    color: "white",
    padding: 3,
    fontSize: 15,
    width: 64,
    textAlign: "center",
  },
});
