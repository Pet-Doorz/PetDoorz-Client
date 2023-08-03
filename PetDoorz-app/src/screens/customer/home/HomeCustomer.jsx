import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Button } from "react-native-paper";
import CarouselComp from "../../../components/customer/Carousel";
import hotel from "../../../../assets/hotel.png"
import grooming from "../../../../assets/grooming.png"
import vaccine from "../../../../assets/vaccine.png"
import { FontAwesome } from "@expo/vector-icons";

export default function HomeCustomer() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <CarouselComp />
        </View>

        <View style={styles.screen}>

          <View style={{ flexDirection: 'row', justifyContent: "space-between", marginVertical: 13 }}>
            <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }}>
              <View style={styles.card}>
                <Image source={hotel} style={{ width: 50, height: 40, resizeMode: "contain" }} />
              </View>
              <Text style={styles.buttonText}>Hotel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }}>
              <View style={styles.card}>
                <Image source={grooming} style={{ width: 50, height: 40, resizeMode: "contain" }} />
              </View>
              <Text style={styles.buttonText}>Grooming</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }}>
              <View style={styles.card}>
                <Image source={vaccine} style={{ width: 40, height: 40, resizeMode: "contain" }} />
              </View>
              <Text style={styles.buttonText}>Vaccine</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: '#48034F' }}>Featured Hotels</Text>
          </View>
          <View style={{ marginTop: 12, marginBottom: 75, gap: 5 }}>

            <View style={styles.cardHotel}>
              <Image source={{ uri: 'https://i.pinimg.com/originals/63/d2/9d/63d29dc26ff877cc55cf6e7aa93b4aac.png' }} style={{ height: '100%', width: 120, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} />
              <View style={{ gap: 5, padding: 12 }}>
                <Text style={styles.title}>The Pet</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome name="star" size={24} color="#FFE324" />
                  <Text style={{ fontWeight: '500', fontSize: 15 }}> 4.53 / 5</Text>
                </View>
                <Text style={{ fontWeight: '300' }}>This hotel is located at Jak...</Text>
              </View>
            </View>

            <View style={styles.cardHotel}>
              <Image source={{ uri: 'https://images-platform.99static.com//y5JdCYqe8WCTdxsRHm2LKNs1IYE=/0x0:1500x1500/fit-in/590x590/99designs-contests-attachments/144/144854/attachment_144854578' }} style={{ height: '100%', width: 120, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} />
              <View style={{ gap: 5, padding: 12 }}>
                <Text style={styles.title}>Perth Pet Boarding</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome name="star" size={24} color="#FFE324" />
                  <Text style={{ fontWeight: '500', fontSize: 15 }}> 4.78 / 5</Text>
                </View>
                <Text style={{ fontWeight: '300' }}>Pet boarding based on PIK ...</Text>
              </View>
            </View>

            <View style={styles.cardHotel}>
              <Image source={{ uri: 'https://img.freepik.com/premium-vector/hand-drawn-logo-pets-hotel-with-bag-paw_341076-282.jpg' }} style={{ height: '100%', width: 120, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} />
              <View style={{ gap: 5, padding: 12 }}>
                <Text style={styles.title}>Wet Nose Pet Hotel</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome name="star" size={24} color="#FFE324" />
                  <Text style={{ fontWeight: '500', fontSize: 15 }}> 4.78 / 5</Text>
                </View>
                <Text style={{ fontWeight: '300' }}>Happy place for wetnose...</Text>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    paddingHorizontal: 30,
  },
  button: {
    height: 75,
    justifyContent: "center",
    borderRadius: 18,
  },
  card: {
    backgroundColor: '#48034F',
    marginBottom: 3,
    padding: 15,
    flexDirection: 'row',
    borderRadius: 10,
  },
  buttonText: {
    color: '#48034F',
    fontSize: 16,
    fontWeight: '600'
  },
  cardHotel: {
    backgroundColor: '#F9F5F6',
    marginBottom: 12,
    paddingRight: 15,
    flexDirection: 'row',
    borderRadius: 10,
    height: 100,
    elevation: 3
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#48034F'
  }
});
