import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { getAddress } from "../services/addressHandler";
import ListAddress from "./Components/manageaddress/ListAddress";

import ManualEntry from "./Components/manageaddress/ManualEntry";

const { width, height } = Dimensions.get("window");
export default class ChangeAddress extends Component {
  state = {
    address: {},
    ...this.props,
  };
  _getAddress = () => {
    const { checkout, type } = this.props;
  };
  componentDidMount() {
    getAddress("@address")
      .then((res) => {
        this.setState({ address: res });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { address, checkout, type } = this.state;

    return (
      <View style={styles.container}>
        {checkout && type === "edit" ? (
          <ListAddress checkout={checkout} />
        ) : (
          <ManualEntry />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  bottomview: {
    width: width - 5,
    alignSelf: "center",
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 5,
    height: 45,
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    position: "absolute",
    bottom: 5,
  },
  confirmLocation: {
    textAlign: "center",
    fontSize: 18,
    color: "#979797",
    marginLeft: 26,
  },
});
