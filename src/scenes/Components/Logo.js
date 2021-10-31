import React, { Component } from "react";
import { View, Text } from "react-native";
export default class Logo extends Component {
  render() {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#F15050", fontSize: 30, fontWeight: "bold" }}>
            Munky
          </Text>
          <Text style={{ color: "#155ef6", fontSize: 29, fontWeight: "bold" }}>
            Box
          </Text>
        </View>
      </>
    );
  }
}
