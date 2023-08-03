import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";

const { width } = Dimensions.get("window");

const DATA = [
  {
    coverImageUri:
      "https://cdn.discordapp.com/attachments/1105772635553529877/1136475627336241202/banner.png",
    cornerLabelColor: "#290030",
    cornerLabelText: "Promo",
  },
  {
    coverImageUri:
      "https://cdn.discordapp.com/attachments/1105772635553529877/1136476082997047316/petdoorzAsset_3.png",
    cornerLabelColor: "#290030",
    cornerLabelText: "Promo",
  },

];

const CarouselComp = () => {
  const renderItem = (data) => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={{ uri: data.coverImageUri }} />
        <View
          style={[
            styles.cornerLabel,
            { backgroundColor: data.cornerLabelColor },
          ]}
        >
          <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={DATA}
        loop
        autoplay
        autoplayInterval={5000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: width * 0.6, // Set the height of the container (60% of the screen width) or any desired height
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 10, // Add some margin at the bottom to separate from the next component
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  cardWrapper: {
    overflow: "hidden",
  },
  card: {
    width: width * 0.9,
    height: width * 0.55,
    resizeMode: "contain", // Make sure the image covers the entire card area
    borderRadius: 8
  },
  cornerLabel: {
    position: "absolute",
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default CarouselComp;