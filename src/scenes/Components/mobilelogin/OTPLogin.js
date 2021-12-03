import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import CountDown from "react-native-countdown-component";
import styles, { width } from "../../styles/AuthStyle";

export default function OTPLogin({ message, phoneNumber, signIn }) {
  const [state, setState] = useState({
    verificationCode: "",
  });
  const clear = () => {
    setState({ verificationCode: "" });
  };
  const [count, setcount] = useState(true);
  return null;
  // <View style={styles.mobin}>
  //   <Text style={[styles.instructions, { marginTop: 5 }]}>
  //     {message || ""} {phoneNumber || ""}
  //   </Text>
  //   <View>
  //     <OTPTextView
  //       handleTextChange={(text) =>
  //         setState({ ...state, verificationCode: text })
  //       }
  //       containerStyle={styles.textInputContainer}
  //       textInputStyle={styles.roundedTextInput}
  //       inputCount={6}
  //       textInputProps={{
  //         returnKeyType: "done",
  //         returnKeyLabel: "Done",
  //         keyboardType: "number-pad",
  //       }}
  //       returnKeyType="done"
  //       inputCellLength={1}
  //       keyboardType="numeric"
  //     />
  //   </View>
  //   <View style={{ flexDirection: "row" }}>
  //     <Text style={styles.instructions}>OTP valid for</Text>
  //     <View>
  //       <CountDown
  //         size={14}
  //         until={60}
  //         digitStyle={{
  //           marginLeft: -4,
  //           marginTop: -8,
  //         }}
  //         digitTxtStyle={{ color: "#fff" }}
  //         timeLabelStyle={{ color: "red", fontWeight: "bold" }}
  //         timeLabels={{ s: null }}
  //         onFinish={() => {
  //           if (count) {
  //             alert("Try again after some time!!!");
  //           }
  //         }}
  //         timeLabelStyle={{ color: "#fff" }}
  //         timeToShow={["S"]}
  //       />
  //     </View>
  //     <Text
  //       style={{
  //         color: "#fff",
  //         marginLeft: -6,
  //         fontSize: 14,
  //         fontWeight: "bold",
  //       }}
  //     >
  //       seconds
  //     </Text>
  //   </View>
  //   <View style={styles.buttonWrapper}>
  //     <TouchableOpacity
  //       style={[
  //         styles.btnOTP,
  //         { width: width / 2.5, height: 40, marginHorizontal: 10 },
  //       ]}
  //       //   onPress={clear}
  //     >
  //       <Text>Clear</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity
  //       style={[
  //         styles.btnOTP,
  //         { width: width / 2.5, height: 40, marginHorizontal: 10 },
  //       ]}
  //       //   onPress={signIn}
  //     >
  //       <Text>Submit</Text>
  //     </TouchableOpacity>
  //   </View>
  // </View>
}
