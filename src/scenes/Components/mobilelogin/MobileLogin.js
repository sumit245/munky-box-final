import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import firebas from "../../../firebas";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import OTPTextView from "react-native-otp-textinput";
import { Actions } from "react-native-router-flux";
import CountDown from "react-native-countdown-component";
import styles from "../../styles/AuthStyle";
import axios from "axios";
import { saveUser } from "../../../services/user/getuser";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const recaptchaVerifier = React.createRef();
const attemptInvisibleVerification = true;
const firebaseConfig = firebas.apps.length
  ? firebas.app().options
  : undefined;

class OTPLogin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      verificationCode: "",
      otpScreen: true,
    };
  }
  clear = () => {
    this.input1.clear();
  };
  _signIn = async () => {
    const { verificationCode, verificationId, phoneNumber } = this.state;
    try {
      const credential = firebas.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await firebas.auth().signInWithCredential(credential);
      axios
        .post("http:munkybox-admin.herokuapp.com/api/users/", {
          phone: phoneNumber,
        })
        .then((res) => {
          this.setState({ otpScreen: false });
          let { status } = res.data;
          let data = res.data;
          if (status === 201) {
            saveUser("user", JSON.stringify(data)).then((response) => {
              Actions.push("home", {
                logintype: "mobile",
                data,
              });
            });
          } else {
            saveUser("user", JSON.stringify(data)).then((response) => {
              Actions.push("user_details", {
                logintype: "mobile",
                data,
              });
            });
          }
          this.props.setLogin(false);
        })
        .catch((err) => console.log(err));
      //
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
  render() {
    const { message, phoneNumber } = this.state;
    return (
      <View style={styles.mobin}>
        <Text style={[styles.instructions, { marginTop: 5 }]}>
          {message || ""} {phoneNumber || ""}
        </Text>
        <View>
          <OTPTextView
            ref={(e) => (this.input1 = e)}
            handleTextChange={(text) =>
              this.setState({ verificationCode: text })
            }
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            tintColor="#ff6600"
            inputCount={6}
            textInputProps={{
              returnKeyType: "done",
              returnKeyLabel: "Done",
              keyboardType: "number-pad",
              selectionColor: "#ff6600"
            }}
            selectionColor="#ff6600"
            returnKeyType="done"
            inputCellLength={1}
            keyboardType="numeric"
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.instructions}>OTP valid for</Text>
          <View>
            <CountDown
              size={14}
              until={60}
              digitStyle={{
                marginLeft: -4,
                marginTop: -8,
              }}

              digitTxtStyle={{ color: "#fff" }}
              timeLabelStyle={{ color: "red", fontWeight: "bold" }}
              timeLabels={{ s: null }}
              onFinish={() => {
                if (this.state.otpScreen) {
                  alert("Try again after some time!!!");
                }
              }}
              timeToShow={["S"]}
            />
          </View>
          <Text
            style={{
              color: "#fff",
              marginLeft: -6,
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            seconds
          </Text>
        </View>
        <View style={styles.buttonWrapper}>

          <TouchableOpacity
            style={[
              styles.btnOTP,
              { width: width / 2.5, height: 40, marginHorizontal: 10 },
            ]}
            onPress={this.clear}
          >
            <Text style={{ fontWeight: "bold", color: "red", fontSize: 18 }}>Clear</Text>
          </TouchableOpacity>
          <LinearGradient colors={["#ff9900", "#ff6600"]} style={[
            styles.btnOTP,
            { width: width / 2.5, height: 40, marginHorizontal: 10, borderColor: '#ff6600' },
          ]} >
            <TouchableOpacity

              onPress={this._signIn}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#fff" }}>Submit</Text>
            </TouchableOpacity>
          </LinearGradient>

        </View>
      </View>
    );
  }
}

export default class MobileLogin extends Component {
  state = {
    phoneNumber: "",
    verificationId: "",
    verificationCode: "",
  };
  _sendVerificationCode = async () => {
    const { phoneNumber } = this.state;
    try {
      const phoneProvider = new firebas.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      this.setState({
        verificationId: verificationId,
        message: "Verification code has been sent to your phone.",
      });
      this.props.displayHeader(true);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };
  setLogin = (param) => {
    this.setState({ verificationId: param });
    this.props.displayHeader(false);
  };
  render() {
    const { phoneNumber, verificationId, message } = this.state;
    return (
      <>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={attemptInvisibleVerification}
        />

        {!verificationId ? (
          <View style={styles.mobin}>
            <PhoneInput
              placeholder="Enter Mobile Number"
              defaultCode="CA"
              textInputProps={{
                returnKeyType: "done",
                returnKeyLabel: "Done",
                keyboardType: "number-pad",
                selectionColor: "#ff6600"
              }}
              containerStyle={styles.btnOTP}
              textContainerStyle={{
                borderColor: "#fff",
                height: 48,
                padding: 0,
                borderRadius: 5,
              }}
              textInputStyle={{ fontSize: 18, marginTop: -6 }}
              codeTextStyle={{ marginTop: -6 }}
              onChangeFormattedText={(phoneNumber) =>
                this.setState({ phoneNumber: phoneNumber })
              }
            />
            <LinearGradient colors={["#ff9900", "#ff6600"]} style={styles.btnOTP}>
              <TouchableOpacity
                onPress={this._sendVerificationCode}
                disabled={!phoneNumber}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Send OTP</Text>
              </TouchableOpacity>
            </LinearGradient>

          </View>
        ) : (
          <OTPLogin
            verificationId={verificationId}
            phoneNumber={phoneNumber}
            message={message}
            setLogin={this.setLogin}
          />
        )}
      </>
    );
  }
}
