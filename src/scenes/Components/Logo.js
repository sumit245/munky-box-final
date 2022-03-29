import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import LogoImage from "../../../assets/logo.png"
export default class Logo extends Component {
  render() {
    return (
      
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
<Image source={LogoImage} resizeMode="contain" style={{height:160,width:160}} />
        </View>
    );
  }
}
