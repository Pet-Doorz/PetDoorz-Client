import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import {
  Button,
  Checkbox,
  Modal,
  PaperProvider,
  Portal,
} from "react-native-paper";
import RoomCard from "../../../components/customer/RoomCard";
import { useSelector } from "react-redux";

export default function BookHotelCustomer({ navigation, route }) {
  const { id } = route.params;
  const [groom, setGroom] = useState(false);
  const [vaccine, setVaccine] = useState(false);
  const [pet, setPet] = useState(3); // dapet dari local storage
  const [total, setTotal] = useState(0);
  const [selectedId, setSelectedId] = useState(); // room id
  const data = useSelector((state) => state.hotel.data);
  const [hotel] = data.filter((e) => e.id === id);

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

  console.log(hotel.services, " < ----- Nigga Mutta Fucka");

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
      const newTotal = (roomPrice.price || 0) * pet + servicesTotal;
      setTotal(newTotal);
    }
  }, [selectedServices, selectedId, pet]);

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
  const handleBook = () => {
    const [roomPrice] = hotel.detailRoom.filter((e) => e.id === selectedId);

    console.log(pet * roomPrice.price);
  };
  const handleRoomId = (id) => {
    setSelectedId(id);
    const [roomPrice] = hotel.detailRoom.filter((e) => e.id === id);
    let tempTotal = roomPrice.price * pet;
    setTotal(tempTotal);
  };

  const services = [
    {
      name: "Grooming",
    },
    {
      name: "Vaccine",
    },
  ];

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
          <Text style={styles.bookTitle}>Alpha Pet Hotel</Text>
          <View style={styles.horizontalMarker} />
          {/* Printilan */}
          <View style={styles.bookRow}>
            <Text style={styles.bookTextContent}>Date Checkin</Text>
            <Text style={styles.bookTextContent}>27 / 8 / 2023</Text>
          </View>
          <View style={styles.bookRow}>
            <Text style={styles.bookTextContent}>Date Checkout</Text>
            <Text style={styles.bookTextContent}>28 / 8 / 2023</Text>
          </View>
          <View style={styles.bookRow}>
            <Text style={styles.bookTextContent}>Total Pet</Text>
            <Text style={styles.bookTextContent}>3</Text>
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
                    <Text>Rp {service?.price}</Text>
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
            onPress={handleBook}
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
