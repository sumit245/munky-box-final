import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  View,
} from "react-native";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import Icon from "react-native-vector-icons/Ionicons";
import { getUser, saveUser } from "../../../services/user/getuser";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { Modal, Portal, Provider } from 'react-native-paper';

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
        axios
          .put("https://munkybox-admin.herokuapp.com/api/users/addcard/" + id, {
            card,
          })
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
    
    return (
      <View style={{marginBottom:6}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 8,
            marginVertical:4
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Add new card
          </Text>
          <Text style={styles.btnText} onPress={this.cardAdd}>
            Save
          </Text>
        </View>
        <LiteCreditCardInput
          requiresCVC
          inputStyle={styles.input}
          validColor={"#228822"}
          invalidColor={"#aa2222"}
          onChange={this._onChange}
          additionInputsProps={{
            expiry: {
              marginLeft: -20,
            },
          }}
        />
        <View style={{ marginHorizontal: 8 }}>
          <Text
            style={{
              fontSize: 14,
              marginTop: 2,
              fontWeight: "bold",
            }}
          >
            Cardholder's Name
          </Text>
          <TextInput
            placeholder="Name"
            style={styles.inputContainer}
            onChangeText={this._onChangeText("card_holder")}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    borderRadius: 2,
    borderColor: "#ccc",
    borderWidth: 0.2,
  },
  btnText: {
    fontSize: 12,
    color: "#2962ff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputContainer: {
    borderBottomColor: "#777",
    borderBottomWidth: 0.5,
  },
});
