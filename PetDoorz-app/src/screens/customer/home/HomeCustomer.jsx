import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function HomeCustomer() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
            gap: 10,
          }}
        >
          <Button mode="contained" style={styles.button}>
            Hotel
          </Button>
          <Button mode="contained" style={styles.button}>
            Service
          </Button>
          <Button mode="contained" style={styles.button}>
            News
          </Button>
        </View>
        <View style={styles.screen}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Events</Text>
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
    paddingHorizontal: 10,
    marginTop: 20,
  },
  button: {
    height: 75,
    justifyContent: "center",
    borderRadius: 18,
  },
});
