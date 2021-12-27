import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";
export default function BackButton() {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => {
        Actions.pop();
      }}
    >
      <Icon name="chevron-back" size={28} color="#223fdc" />
    </TouchableOpacity>
  );
}
