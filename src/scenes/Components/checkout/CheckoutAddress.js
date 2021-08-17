import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import { getAddress, removeAddress } from "../../../services/addressHandler";
import { Actions } from "react-native-router-flux";

export default class CheckoutAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      selected: false,
    };
  }
  onAddressSelect = (address) => {
    this.setState({ address: address });
    this.props.addressHandler(address);
  };
  _nextAction = () => {
    Actions.push("listAddress", {
      title: "Manage Address",
      checkout: true,
      onAddressSelect: this.onAddressSelect,
    });
  };

  render() {
    const { optionrow, options } = this.props;
    const { address, selected } = this.state;
    return (
      <>
        <TouchableOpacity
          style={[optionrow, { alignItems: "center" }]}
          onPress={this._nextAction}
        >
          <Text style={[options, { textTransform: "capitalize" }]}>
            {address || "Add an address"}
          </Text>
          <Icon name="angle-right" color="#ccc" size={16} />
        </TouchableOpacity>
      </>
    );
  }
}
const styles = StyleSheet.create({
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 1,
  },
  buttons: {
    height: 24,
    width: 24,
    padding: 1,
    margin: 2,
    justifyContent: "center",
  },
  hyperlink: {
    color: "#245399",
    textAlign: "right",
    textDecorationStyle: "solid",
  },
});
