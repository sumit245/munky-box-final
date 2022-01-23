import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import styles from "../../styles/AuthStyle";
import { width } from "../../styles/HomeStyles";

export default function EmailLogin() {
  return (
    <TouchableOpacity style={[styles.btnOTP, { width: width - 48,alignSelf:'center' }]}>
      <Icon name="email" color="#4267B2" size={26} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Continue with PIN
      </Text>
    </TouchableOpacity>
  );
}
