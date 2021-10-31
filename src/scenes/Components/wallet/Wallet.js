import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { styles, width } from "../../styles/HomeStyles";
import Icon from "react-native-vector-icons/Ionicons";

export default function Wallet() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
    >
      <View style={{ alignItems: "center" }}>
        <Icon name="sad" size={80} color="#fc3" />
        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
          Oops!!! No Balance
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#226ccf",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          width: width,
        }}
      >
        <Text
          style={{
            textTransform: "uppercase",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Recharge your wallet
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
