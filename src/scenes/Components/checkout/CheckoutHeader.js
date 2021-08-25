import React, { Component } from "react";
import { Image } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default class CheckoutHeader extends Component {
  render() {
    const { uri } = this.props;
    console.log(uri);
    return (
      <Image
        source={{ uri: uri }}
        style={{ width: width, height: 150 }}
        height={150}
      />
    );
  }
}
