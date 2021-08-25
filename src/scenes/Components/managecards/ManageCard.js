import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import Icon from "react-native-vector-icons/Ionicons";

import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { getUser,saveUser } from "../../../services/user/getuser";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";

const { width, height } = Dimensions.get("window");
export default class ManageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      message: "",
      selected: false,
    };
  }
  _onChange = (formData) => {
    let cardDetails = JSON.stringify(formData, null, "");
    this.setState({ cardDetails: cardDetails });
  };
  _onChangeText = (id) => (e) => {
    const data = { [id]: e };
    this.setState({
      [id]: e,
    });
  };

  cardAdd = () => {
    let { cardDetails } = this.state;
    let { card_holder, country, postal_code } = this.state;
    let attemptCard = JSON.parse(cardDetails).values;
    const card = {
      brand: attemptCard.type,
      number: attemptCard.number,
      expiry: attemptCard.expiry,
      cvc: attemptCard.cvc,
      card_holder: card_holder,
      country: country,
      postal_code: postal_code,
    };

    getUser("user")
      .then((res) => {
        let id = res.data._id;
        console.log(id);
        axios
          .put("http://munkybox-admin.herokuapp.com/api/users/addcard/" + id, { card })
          .then((res) => {
            alert(res.data.msg);
            saveUser("user", JSON.stringify(res.data)).then((res) => {
              Actions.push("manageCards", { title: "Manage Payments" });
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log("Error in async"));
    // if (JSON.parse(card).valid === true) {
    //   let currCard = "@card" + numCards;
    //   const cardDetail = [currCard, card];
    //   setMultipleCards(cardDetail);
    // } else {
    //   ToastAndroid.show("Check your details and try again :(", 1000);
    // }
  };
  render() {
    const { cards, message, selected } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled
          style={{ flex: 1 }}
        >
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ height: height - 80 }}
          >
            <Text
              style={{
                paddingHorizontal: 14,
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 16,
                marginBottom: 6,
              }}
            >
              Add Card
            </Text>
            <LiteCreditCardInput
              requiresCVC
              inputStyle={styles.input}
              validColor={"#228822"}
              invalidColor={"#aa2222"}
              placeholderColor={"darkgray"}
              onChange={this._onChange}
              additionInputsProps={{
                expiry: {
                  marginLeft: -20,
                },
              }}
            />
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 16,
                marginTop: 2,
                fontWeight: "bold",
              }}
            >
              Cardholder's Name
            </Text>
            <TextInput
              mode="outlined"
              placeholder="Name"
              style={styles.inputContainer}
              onChangeText={this._onChangeText("card_holder")}
            />
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 16,
                marginTop: 2,
                fontWeight: "bold",
              }}
            >
              Country
            </Text>
            <TextInput
              mode="outlined"
              placeholder="Country"
              style={styles.inputContainer}
              onChangeText={this._onChangeText("country")}
            />
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 2,
              }}
            >
              Postal Code
            </Text>
            <TextInput
              mode="outlined"
              placeholder="Postal Code"
              style={styles.inputContainer}
              onChangeText={this._onChangeText("postal_code")}
            />

            <TouchableOpacity style={styles.button} onPress={this.cardAdd}>
              <Icon name="card-outline" size={28} color="#FFF" />
              <Text style={styles.btnText}>Save card</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 0.2,
    padding: 6,
    marginHorizontal: 2,
  },
  button: {
    width: width - 5,
    borderRadius: 6,
    borderWidth: 0.2,
    marginHorizontal: 2,
    paddingHorizontal: 5,
    height: 45,
    backgroundColor: "#2962ff",
    position: "absolute",
    bottom: 6,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
    marginLeft: 26,
    textTransform: "uppercase",
  },
  inputContainer: {
    backgroundColor: "#fff",
    paddingVertical: 0,
    marginHorizontal: 10,
    height: 40,
    textAlignVertical: "center",
  },
});
