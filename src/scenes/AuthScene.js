import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Actions } from "react-native-router-flux";
import MobileLogin from "./Components/mobilelogin/MobileLogin";
import EmailLogin from "./Components/emaillogin/EmailLogin";
import FBLogin from "./Components/facebooklogin/FBLogin";
import GoogLogin from "./Components/googlelogin/GoogLogin";
import Logo from "./Components/Logo";
import Icon from "react-native-vector-icons/Ionicons";
import { ImageBackground } from "react-native";
import styles from "./styles/AuthStyle";
import BackButton from "./Components/utility/BackButton";
import { LinearGradient } from "expo-linear-gradient";

export default class AuthScene extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    message: "",
    otpSent: false,
  };
  displayHeader = (param) => {
    this.setState({ otpSent: param });
  };
  render() {
    return (
      <ImageBackground
        source={require("../../assets/imagebackground.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            padding: StatusBar.currentHeight,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {this.state.otpSent ? (
              <BackButton />
            ) : (
              <View />
            )}
            <LinearGradient colors={["#ff9900", "#ff6600"]} style={styles.skip}>
              <TouchableOpacity
                onPress={() => Actions.push("home", { logintype: "" })}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold",color:"#fff" }}>Skip</Text>
              </TouchableOpacity>
            </LinearGradient>

          </View>

          <Logo />

          <MobileLogin
            displayHeader={this.displayHeader}
            routeName={this.props.name}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine} />
            </View>
            {/* Or */}

            <EmailLogin />

          </View>
          <Text style={styles.termsCondition}>
            By continuing, you agree to our{" "}
            <Text style={{ textDecorationLine: "underline", color: "#226ccf" }}>
              terms and conditions
            </Text>
          </Text>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
