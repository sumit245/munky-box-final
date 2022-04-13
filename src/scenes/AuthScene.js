import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground
} from "react-native";
import { Actions } from "react-native-router-flux";
import MobileLogin from "./Components/mobilelogin/MobileLogin";
import EmailLogin from "./Components/emaillogin/EmailLogin";
import Logo from "./Components/Logo";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles/AuthStyle";
import { LinearGradient } from "expo-linear-gradient";
import { Provider } from "react-native-paper";
import Termsandconditions from "./Components/mobilelogin/Termsandconditions";

export default class AuthScene extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    message: "",
    otpSent: false,
    terms: false
  };

  displayHeader = (param) => {
    this.setState({ otpSent: param });
  };
  backHandler = () => {
    this.setState({ otpSent: false })
  }
  hideModal = () => {
    this.setState({ terms: false })
  }

  render() {
    return (
      <Provider>
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
                <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
                  height: 28,
                  width: 28,
                  marginHorizontal: 4,
                  borderRadius: 14,
                }}>
                  <TouchableOpacity

                    onPress={this.backHandler}
                  >
                    <Icon name="chevron-back-sharp" size={28} color="#ffffff" />
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <View />
              )}
              <LinearGradient colors={["#ff9900", "#ff6600"]} style={styles.skip}>
                <TouchableOpacity
                  onPress={() => Actions.push("home", { logintype: "" })}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff", textAlign: "center" }}>Skip</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <Logo />
            <MobileLogin
              displayHeader={this.displayHeader}
              routeName={this.props.name}
              otpSent={this.state.otpSent}
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
              <Text style={{ textDecorationLine: "underline", color: "#226ccf" }} onPress={() => this.setState({ terms: true })} >
                terms and conditions
              </Text>
            </Text>
            {
              this.state.terms && (
                <Termsandconditions visible={this.state.terms} hideModal={this.hideModal} />
              )
            }
          </SafeAreaView>

        </ImageBackground>

      </Provider>
    );
  }
}
