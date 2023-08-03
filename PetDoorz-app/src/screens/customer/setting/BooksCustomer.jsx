import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BookingCard from "../../../components/customer/BookingCard";
import { detailCustomer, getHotelById, getReview } from "../../../store/actions/actionCustomer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, Button } from "react-native-paper";
import { Picker } from '@react-native-picker/picker'
import { FontAwesome } from '@expo/vector-icons';


let perEmail;
let token;
export default function BooksCustomer({ navigation }) {
  const reviews = useSelector((state) => state.customer.reviews)
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(false)


  // filter booking
  const [filter, setFilter] = useState('all')
  const bookings = useSelector(
    (state) => state.customer.detailCustomer.Bookings
  );
  const sortedBook = bookings.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  })
  const [filtered, setFiltered] = useState(sortedBook)

  const handleBookingDetails = (id) => {
    navigation.navigate("Customer Book Detail", {
      id,
    });
  };
  const getAccessToken = async () => {
    return await AsyncStorage.getItem("customer_access_token");
  };

  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      getAccessToken()
        .then((access_token) => {
          token = access_token;
          dispatch(getReview(access_token))
            .catch((err) => {
              console.log(err, '<<< review')
            });
        })
        .catch((err) => {
          throw err;
        })
        .finally((_) => {
          setLoading(false)
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

  const handleRefresh = async () => {
    setLoading(true)
    const access_token = await AsyncStorage.getItem('customer_access_token')
    dispatch(detailCustomer(access_token))
      .then((_) => {
        setFiltered(sortedBook)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err, '<<< review')
      });
    dispatch(getReview(access_token))
      .then((_) => {
        setLoading(false)
      })
      .catch((err) => {
        console.log(err, '<<< review')
      });
  }

  const handleVidCallHotel = () => { };

  if (loading) return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'}></ActivityIndicator>
    </View>
  )

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.title, { flex: 2 }]}>Bookings</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={handleRefresh}>
            <FontAwesome name="refresh" size={23} color="#48034F" />
          </TouchableOpacity>
          {/* Picker pake package */}
          <Picker
            mode="dropdown"
            selectedValue={filter}
            onValueChange={(itemValue, itemIndex) => {
              setFilter(itemValue)
              if (itemValue === 'all') {
                setFiltered(sortedBook)
              } else {
                const filtered = sortedBook.filter((e) => e.status === itemValue)
                setFiltered(filtered)
              }
            }
            }
            style={{ flex: 1 }}
          >
            {/* Picker Item, pilihan service statis dari kita */}
            <Picker.Item label="All" value="all" />
            <Picker.Item label="Done" value="done" />
            <Picker.Item label="Process" value="process" />
            <Picker.Item label="Booked" value="booked" />
          </Picker>

        </View>
        <View style={{ marginTop: 7 }}>
          {/* List Booking */}
          {
            filtered.length > 0 ? (
              filtered.map((e) => {
                const res = reviews.filter((review) => e.id === review.bookingId)
                return (
                  <BookingCard
                    key={e.id}
                    booking={e}
                    handleBookingDetails={handleBookingDetails}
                    handleChatHotel={() => handleChatHotel(e.Room.HotelId)}
                    handleReview={handleReview}
                    res={res}
                  />
                );
              })
            ) : (
              <View>
                <Text style={{ fontWeight: '500', fontSize: 15 }}>There are no booking yet.</Text>
              </View>
            )
          }
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
    fontSize: 23,
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
