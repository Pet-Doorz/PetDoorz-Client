import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Button } from "react-native-paper";
import CarouselComp from "../../../components/customer/Carousel";
import hotel from "../../../../assets/hotel.png"
import grooming from "../../../../assets/grooming.png"
import vaccine from "../../../../assets/vaccine.png"

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
            <Text style={{ fontSize: 20, fontWeight: "bold", color: '#48034F' }}>Events</Text>
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
  }
});
