import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import firebase from "../../../firebase";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import OTPTextView from "react-native-otp-textinput";
import { Actions } from "react-native-router-flux";
import CountDown from "react-native-countdown-component";
import styles from "../../styles/AuthStyle";
import axios from "axios";
import { saveUser } from "../../../services/user/saveuser";

const { width } = Dimensions.get("window");
const recaptchaVerifier = React.createRef();
const attemptInvisibleVerification = true;
const firebaseConfig = firebase.apps.length
  ? firebase.app().options
  : undefined;

class OTPLogin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      verificationCode: "",
    };
  }
  clear = () => {
    this.input1.clear();
  };
  _signIn = async () => {
    const { verificationCode, verificationId, phoneNumber } = this.state;
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await firebase.auth().signInWithCredential(credential);
      axios
        .post("http:munkybox-admin.herokuapp.com/api/users/", {
          phone: phoneNumber,
        })
        .then((res) => {
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
            Actions.push("userdetails", {
              logintype: "mobile",
              phone: phoneNumber,
            });
          }
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
            inputCount={6}
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
                alert("Try again after some time!!!");
              }}
              timeLabelStyle={{ color: "#fff" }}
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
            <Text>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnOTP,
              { width: width / 2.5, height: 40, marginHorizontal: 10 },
            ]}
            onPress={this._signIn}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
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
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      this.setState({
        verificationId: verificationId,
        message: "Verification code has been sent to your phone.",
      });
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
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
              textInputProps={(returnKeyType = "done")}
              containerStyle={styles.btnOTP}
              textContainerStyle={
                // styles.btnOTP,
                {
                  borderColor: "#fff",
                  height: 48,
                  textAlignVertical: "top",
                  marginVertical: -5,
                  borderRadius: 5,
                }
              }
              onChangeFormattedText={(phoneNumber) =>
                this.setState({ phoneNumber: phoneNumber })
              }
            />
            <TouchableOpacity
              onPress={this._sendVerificationCode}
              disabled={!phoneNumber}
              style={styles.btnOTP}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <OTPLogin
            verificationId={verificationId}
            phoneNumber={phoneNumber}
            message={message}
          />
        )}
      </>
    );
  }
}
