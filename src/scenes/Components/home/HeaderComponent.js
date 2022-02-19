import React from "react";
import DeliveryOptions from "./DeliveryOptions";
import SortAndFilter from "./SortAndFilter";
import { styles } from "../../styles/HomeStyles";
import { View } from "react-native";
import FavoritePicker from "./FavoritePicker";
import { Searchbar } from "react-native-paper";
export default function HeaderComponent({ favCount, applyfilter }) {
  return (
    <View style={styles.header}>
      <DeliveryOptions />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Searchbar/>
        <FavoritePicker favCount={favCount} />
        <SortAndFilter applyFilter={applyfilter} />
      </View>
    </View>
  );
}
