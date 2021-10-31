import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import * as GoogleSignIn from "expo-google-sign-in";
import { Actions } from "react-native-router-flux";
import styles from "../../styles/AuthStyle";

export default class GoogLogin extends Component {
  state = { user: null };
  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user });
  };
  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        this._syncUserWithStateAsync();
        Actions.replace("userdetails", { logintype: "email" });
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };
  render() {
    return (
      <>
        <TouchableOpacity onPress={this.signInAsync} style={styles.smallButton}>
          <Icon name="google" color="red" size={24} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}> Google </Text>
        </TouchableOpacity>
      </>
    );
  }
}
