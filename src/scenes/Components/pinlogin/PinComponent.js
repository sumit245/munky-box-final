import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, View, SafeAreaView, Text } from "react-native";
import ReactNativePinView from "react-native-pin-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "../../../scenes/Components/utility/BackButton"

const PinComponent = ({ navigation, entry, logintype, data }) => {
  const pinView = useRef(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [showCompletedButton, setShowCompletedButton] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [pin, setPin] = useState("");

  const getApiData = async (enteredPin) => {
    try {
      const response = await AsyncStorage.getItem("credential");
      const { pin } = JSON.parse(response);
      if (pin === enteredPin) {
        navigation.navigate("home");
      } else {
        alert("Wrong Pin");
      }
    } catch (error) {
      alert("Login for first time using otp");
    }
  };

  const unlock = () => {
    if (entry) {
      setConfirmation(true);
      if (confirmation) {
        if (pin === enteredPin) {
          const credential = {
            entry: false,
            pin: pin,
          };
          AsyncStorage.setItem("credential", JSON.stringify(credential)).then(
            () => {
              pinView.current.clearAll();
              navigation.navigate("home", {
                logintype: logintype,
                data
              });
            }
          );
        } else {
          alert("Confirmation and Entered PIN code does not match");
        }
      } else {
        setPin(enteredPin);
        pinView.current.clearAll();
      }
    } else {
      getApiData(enteredPin);
    }
  };

  const resetPin = () => {
    AsyncStorage.clear();
    navigation.pop();
  };

  useEffect(() => {
    enteredPin.length > 0
      ? setShowRemoveButton(true)
      : setShowRemoveButton(false);

    enteredPin.length === 4
      ? setShowCompletedButton(true)
      : setShowCompletedButton(false);
  }, [enteredPin]);

  return (
    <ImageBackground
      source={require("../../../../assets/imagebackground.jpg")}
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.container}>
        {entry ? (
          <View style={{ position: "absolute", left: 10, top: 40, marginBottom: 40 }}>
            <BackButton />
          </View>
        ) : (
          <View style={{ marginBottom: 80 }} />
        )}

        <View style={styles.pinMsgView}>
          {confirmation ? (
            <>
              <Text style={styles.pinMsg}>Confirm PIN Code</Text>
            </>
          ) : (
            entry && (
              <>
                <Text style={styles.pinMsg}>
                  Create a PIN code for your account.
                </Text>
              </>
            )
          )}
          <Text style={styles.pinMsg}>Enter 4 Digits PIN</Text>
        </View>

        <ReactNativePinView
          inputSize={32}
          ref={pinView}
          pinLength={4}
          buttonSize={60}
          onValueChange={(value) => setEnteredPin(value)}
          buttonAreaStyle={{
            marginTop: 24,
          }}
          inputAreaStyle={styles.pinInputAreaStyle}
          inputViewEmptyStyle={{
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "#FBECEC",
          }}
          inputViewFilledStyle={{
            backgroundColor: "#FFFFFF",
          }}
          buttonViewStyle={{
            borderWidth: 2,
            borderColor: "#F5EFEF",
          }}
          buttonTextStyle={{
            color: "#F5EFEF",
            fontWeight: "bold",
          }}
          onButtonPress={(key) => {
            if (key === "custom_left") {
              pinView.current.clear();
            }
            if (key === "custom_right") {
              unlock();
            }
          }}
          customLeftButton={
            showRemoveButton ? (
              <Icon name={"ios-backspace"} size={36} color="#FBECEC" />
            ) : null
          }
          customRightButton={
            showCompletedButton ? (
              <Icon name={"ios-lock-open"} size={36} color="#FBECEC" />
            ) : null
          }
        />
        {/* </View> */}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.forgot_button} onPress={() => navigation.pop()}>
            Login with OTP
          </Text>
          <Text style={styles.forgot_button} onPress={resetPin}>
            Forgot Pin? Reset Here
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default PinComponent;
