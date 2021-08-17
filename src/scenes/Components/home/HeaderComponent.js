import React, { Component } from "react";
import DeliveryOptions from "./DeliveryOptions";
import SortAndFilter from "./SortAndFilter";
import { styles } from "../../styles/HomeStyles";
import { View } from "react-native";

export default class HeaderComponent extends Component {
  render() {
    return (
      <View style={styles.header}>
        <DeliveryOptions />
        <SortAndFilter />
      </View>
    );
  }
}
