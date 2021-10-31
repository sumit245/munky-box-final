import React from "react";
import DeliveryOptions from "./DeliveryOptions";
import SortAndFilter from "./SortAndFilter";
import { styles } from "../../styles/HomeStyles";
import { View } from "react-native";
import FavoritePicker from "./FavoritePicker";
export default function HeaderComponent({ applyfilter }) {
  return (
    <View style={styles.header}>
      <DeliveryOptions />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FavoritePicker />
        <SortAndFilter applyFilter={applyfilter} />
      </View>
    </View>
  );
}
