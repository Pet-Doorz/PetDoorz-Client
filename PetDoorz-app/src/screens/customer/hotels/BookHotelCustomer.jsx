import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert
} from "react-native";
import {
  Button,
  Checkbox,
  Modal,
  PaperProvider,
  Portal,
} from "react-native-paper";
import RoomCard from "../../../components/customer/RoomCard";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBooking } from "../../../store/actions/actionCustomer";

export default function BookHotelCustomer({ navigation, route }) {
  const { id } = route.params;

  // date diff
  const checkin = useSelector((state) => state.customer.checkin)
  const checkout = useSelector((state) => state.customer.checkout)
  const totalPet = useSelector((state) => state.customer.totalPet)

  const checkinDate = new Date(checkin).toLocaleDateString()
  const checkoutDate = new Date(checkout).toLocaleDateString()

  const Difference_In_Time = checkout.getTime() - checkin.getTime();
  const amountDate = Difference_In_Time / (1000 * 3600 * 24)
  // date diff

  // button alert
  const buttonAlert = () =>
    Alert.alert('Success', 'Successfully Booked', [
      { text: 'OK', onPress: () => navigation.navigate('User Setting Home') },
    ]);

  const [groom, setGroom] = useState(false);
  const [vaccine, setVaccine] = useState(false);
  const [pet, setPet] = useState(3); // dapet dari local storage
  const [total, setTotal] = useState(0);
  const [selectedId, setSelectedId] = useState(); // room id
  const data = useSelector((state) => state.hotel.data);
  const [hotel] = data.filter((e) => e.id === id);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [selectedServices, setSelectedServices] = useState({
    groom: {
      selected: false,
      price:
        hotel.services.find((service) => service.name === "Grooming")?.price ||
        0,
    },
    vaccine: {
      selected: false,
      price:
        hotel.services.find((service) => service.name === "Vaccine")?.price ||
        0,
    },
  });
  // total2an
  const handleServiceCheckboxChange = (serviceName) => {
    setSelectedServices((prevServices) => ({
      ...prevServices,
      [serviceName]: {
        ...prevServices[serviceName],
        selected: !prevServices[serviceName]?.selected || false,
        price: !prevServices[serviceName]?.selected
          ? hotel.services.find((s) => s.name === serviceName)?.price || 0
          : 0,
      },
    }));
  };

  useEffect(() => {
    const servicesTotal = Object.values(selectedServices).reduce(
      (total, service) => total + (service.selected ? service.price : 0),
      0
    );

    const roomPrice = hotel.detailRoom.find((e) => e.id === selectedId);
    if (roomPrice) {
      const newTotal = (roomPrice.price || 0) * totalPet * amountDate + (servicesTotal * totalPet);
      setTotal(newTotal);
    }
  }, [selectedServices]);

  useEffect(() => {
    setSelectedServices((prev) => ({
      ...prev,
      groom: {
        ...prev.groom,
        price: groom ? hotel.services[0].price : 0,
      },
      vaccine: {
        ...prev.vaccine,
        price: vaccine ? hotel.services[1].price : 0,
      },
    }));
  }, [groom, vaccine]);

  // keperluan modal
  const [visible, setVisible] = useState(false);

  const [desc, setDesc] = useState({
    description: "",
    imageUrl: "",
  });

  const showModal = (id) => {
    setVisible(true);
    const [desc] = hotel.detailRoom.filter((e) => e.id === id);
    console.log(desc);
    setDesc({
      description: desc.description,
      imageUrl: desc.imageUrl,
    });
  };
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
  };

  // hadnle tomobl book
  const handleRoomId = (id) => {
    setSelectedId(id);
    setSelectedServices({})
    const [roomPrice] = hotel.detailRoom.filter((e) => e.id === id);
    let tempTotal = roomPrice.price * totalPet * amountDate;
    setTotal(tempTotal);
  };

  const changeDateFormat = async (inputDate) => {
    if (!inputDate) {
      return "";
    }

    const parts = inputDate.split("/");
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return `${year}-${month}-${day}`;
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      const checkInDate = await AsyncStorage.getItem("checkin");
      const checkOutDate = await AsyncStorage.getItem("checkout");
      const token = await AsyncStorage.getItem("customer_access_token");

      if (!checkInDate || !checkOutDate) {
        throw new Error("Check-in or Check-out date not set.");
      }

      if (!token) {
        throw new Error("Access Token is rather undefined or null.");
      }

      const selectedNames = Object.keys(selectedServices).filter(
        (key) => selectedServices[key].selected === true
      );

      const selectedServiceIds = selectedNames.map((names) => {
        return hotel.services.find((service) => service.name === names).id;
      });

      const bookingData = {
        RoomId: selectedId,
        checkIn: await changeDateFormat(checkInDate),
        checkOut: await changeDateFormat(checkOutDate),
        totalPet: await AsyncStorage.getItem("totalPet"),
        grandTotal: total,
        bookingServices: selectedServiceIds,
        access_token: token,
      };

      dispatch(createBooking(bookingData))
        .then((result) => {
          console.log(result)
          buttonAlert()
        }).catch((err) => {
          console.log(err)
        });
      setTimeout(() => {}, 1500);
    } catch (error) {
      console.error("Error occurred while booking:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      {/* Modal */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Image
            source={{ uri: desc.imageUrl }}
            style={{ width: 200, height: 200 }}
          ></Image>
          <Text>{desc.description}</Text>
        </Modal>
      </Portal>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {/* Diatasnya card */}
        <View style={[styles.card, styles.shadowProp]}>
          {/* Title card / nama hotel */}
          <Text style={styles.bookTitle}>{hotel.name}</Text>
          <View style={styles.horizontalMarker} />
          {/* Printilan */}
          <View style={styles.bookRow}>
            <Text style={styles.bookTextContent}>Date Checkin</Text>
            <Text style={styles.bookTextContent}>{checkinDate}</Text>
          </View>
          <View style={styles.bookRow}>
            <Text style={styles.bookTextContent}>Date Checkout</Text>
            <Text style={styles.bookTextContent}>{checkoutDate}</Text>
          </View>
          <View style={styles.bookRow}>
            <Text style={styles.bookTextContent}>Total Pet</Text>
            <Text style={styles.bookTextContent}>{totalPet}</Text>
          </View>

          {/* Choose Room, roomcard bisa jadi component */}
          <View>
            <Text style={styles.bookTextContent}>Choose room :</Text>
            {/* Room card, dapetnya id aja kali */}

            {hotel.detailRoom.map((e, i) => {
              return (
                <RoomCard
                  key={i}
                  handleRoomId={handleRoomId}
                  id={e.id}
                  selectedId={selectedId}
                  room={e}
                  showModal={showModal}
                />
              );
            })}
          </View>

          {/* Checkbox */}
          <View>
            {/* Checkbox groom, ini nanti bisa di slicing jadi component */}
            {hotel.services.map((service) => {
              const serviceData = selectedServices[service.name];
              return (
                <View
                  key={service.name}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Checkbox
                      status={serviceData?.selected ? "checked" : "unchecked"}
                      onPress={() => handleServiceCheckboxChange(service.name)}
                      color="#48034F"
                    />
                    <Text>{service?.name}</Text>
                  </View>
                  <View>
                    {/* Price bisa diganti */}
                    <Text>Rp {+service?.price * totalPet}</Text>
                  </View>
                </View>
              );
            })}

            {/* Checkbox groom, ini nanti bisa di slicing jadi component */}

            {/* Grand Total, masi hardcode   */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Text style={card.total}>Grand Total</Text>
              <Text style={card.total}>Rp. {total} </Text>
            </View>
          </View>

          <Button
            mode="contained"
            style={{ marginTop: 15 }}
            theme={{ colors: { primary: "#48034F" } }}
            onPress={handleBooking}
          >
            Book
          </Button>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  roomCard: {
    backgroundColor: "gray",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "90%",
    paddingBottom: 25,
  },
  shadowProp: {
    elevation: 3,
  },
  horizontalMarker: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 12,
    marginBottom: 12,
    elevation: 2,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  bookTextContent: {
    fontSize: 16,
  },
  bookRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
  },
});

const card = StyleSheet.create({
  title: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  textContent: {
    fontSize: 14,
    color: "white",
    fontWeight: "400",
    marginTop: 10,
  },
  priceText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
  },
  active: { backgroundColor: "#48034F" },
});
