import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView } from "react-native";
import { Actions } from "react-native-router-flux";
import { StatusBar } from "react-native";
import MobileLogin from "./Components/mobilelogin/MobileLogin";
import EmailLogin from "./Components/emaillogin/EmailLogin";
import FBLogin from "./Components/facebooklogin/FBLogin";
import GoogLogin from "./Components/googlelogin/GoogLogin";
import Logo from "./Components/Logo";
import { ImageBackground } from "react-native";
import styles from "./styles/AuthStyle";

const { width, height } = Dimensions.get("window");
export default class AuthScene extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    phoneNumber: "",
    verificationId: "",
    verificationCode: "",
    message: "",
  };
  render() {
    return (
      <ImageBackground
        source={require("../../assets/imagebackground.jpg")}
        style={{ width: "100%", height: "100%", flex: 1 }}
      >
         <StatusBar />
       <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={styles.skip}
            onPress={() => Actions.push("home", { logintype: "" })}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Skip </Text>
          </TouchableOpacity>

          <Logo />
          <MobileLogin />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              top: -60,
            }}
          >
            <View style={[styles.orLine, { marginLeft: 18 }]} />
            <Text style={styles.orText}>OR</Text>
            <View style={[styles.orLine, { marginRight: 16 }]} />
          </View>
          <EmailLogin />
          <View style={styles.social}>
            <FBLogin />
            <GoogLogin />
          </View>
          <Text style={styles.termsCondition}>
            By Continuing,you agree to our terms and conditions
          </Text>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
