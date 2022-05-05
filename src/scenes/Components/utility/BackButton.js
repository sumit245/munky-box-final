import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";
import { LinearGradient } from "expo-linear-gradient";
export default function BackButton() {
  return (
    <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
      height: 28,
      width: 28,
      marginHorizontal: 4,
      borderRadius: 14,
    }}>
      <TouchableOpacity
        onPress={() => {
          Actions.pop();
        }}
      >
        <Icon name="chevron-back-sharp" size={28} color="#ffffff" />
      </TouchableOpacity>
    </LinearGradient>
  );
}
