import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../../styles/AuthStyle";
import { width } from "../../styles/HomeStyles";

export default function EmailLogin() {
  return (
    <TouchableOpacity style={[styles.btnOTP, { width: width - 48, alignSelf: 'center' }]}>
      <Icon name="keypad-outline" color="#ff6600" size={26} />
      <Text style={{ fontSize: 20, fontWeight: "bold",marginLeft:-40 }}>
        Continue with PIN
      </Text>
    </TouchableOpacity>
  );
}
