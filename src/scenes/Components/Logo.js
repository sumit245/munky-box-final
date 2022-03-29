import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import Logo from "../../../assets/logo.png"
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
<Image source={Logo} height={60} width={60} resizeMode="center" />
        </View>
      </>
    );
  }
}
