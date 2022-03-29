import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import LogoImage from "../../../assets/logo.png"
export default class Logo extends Component {
  render() {
    return (

      <Image source={LogoImage} height={60} width={60} resizeMode="center" />

    );
  }
}
