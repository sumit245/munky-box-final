import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function NoOrders() {
  return (
    <View style={{flex:1, justifyContent: "center", alignItems: "center" }}>
      <Icon name="fast-food-outline" size={50} />
      <Text>Your order history will be displayed here</Text>
    </View>
  );
}
