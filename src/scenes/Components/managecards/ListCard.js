import React, { Component, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView
} from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import { Actions } from "react-native-router-flux";
import { RadioButton, Provider, Badge } from "react-native-paper";
import { PaymentIcon } from "react-native-payment-icons"
import { getUser, saveUser } from "../../../services/user/getuser";
import ManageCard from "./ManageCard";
import PIC from "../../../../assets/wallet.png";
import {
  SwipeableFlatList,
  SwipeableQuickActionButton,
  SwipeableQuickActions,
} from "react-native-swipe-list";
import Trash from "../../../../assets/Trash.png";

import axios from "axios";
import { USER_URL } from "../../../services/EndPoints";
import { LinearGradient } from "expo-linear-gradient";


const ListEmptyContent = () => {
  return (
    <View style={styles.centerContent}>
      <Icon name="frowning" size={80} color="#666" />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        No Cards Added to payment method
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "#666",
          paddingVertical: 10,
          textTransform: "capitalize",
        }}
      >
        You didn't have any cards saved.{"\n"}
        Saved cards helps us to manage payments faster.
      </Text>
    </View>
  );
};
const trimmer = (word) => {
  for (let i = 0; i <= word.length - 5; i++) {
    word = word.replace(word[i], "*");
  }
  return word;
};
const cvctrimmer = (cvc) => {
  for (let i = 0; i < cvc.length; i++) {
    cvc = cvc.replace(cvc[i], "*");
  }
  return cvc;
};
const PaymentCard = ({ item, checked, changeSelector }) => {
  let card_number = item.number;
  card_number = trimmer(card_number);
  const [trimmedState, setTrimmedState] = useState(true);
  let cryptcvc = "";
  if (trimmedState) {
    cryptcvc = cvctrimmer(item.cvc);
  } else {
    cryptcvc = item.cvc;
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PaymentIcon
            type={
              item.brand === "master-card"
                ? "mastercard"
                : item.brand
            }
            width={50}
          />
          <Text style={styles.headerText}>{card_number}</Text>
        </View>

        <RadioButton.Android
          value={item.number}
          status={checked === item.number ? "checked" : "unchecked"}
          onPress={() => changeSelector(item.number)}
          color="#ff6600"
        />
      </View>
      <View style={styles.cardBody}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 300,
          }}
        >
          <Text style={[styles.content, { fontWeight: "bold" }]}>
            {item.card_holder}
          </Text>
          <Text style={styles.content}>{cryptcvc || item.cvc}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 300,
          }}
        >
          <Text style={styles.content}>{item.expiry}</Text>
          <Text
            style={[
              styles.content,
              {
                color: "#226ccf",
                textDecorationLine: "underline",
                fontWeight: "bold",
                fontSize: 10,
              },
            ]}
            onPress={() => {
              setTrimmedState(!trimmedState);
            }}
          >
            {trimmedState ? "SHOW CVC" : "HIDE CVC"}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default class ListCard extends Component {
  state = {
    cards: [],
    checked: "home",
    modalVisible: false,
    user_id: "",
    wallet_balance: 0,
  };
  fetchUser = () => {
    getUser("user").then((res) => {
      this.setState({
        cards: res.data.cards,
        user_id: res.data._id,
        wallet_balance: res.data.wallet_balance,
      });
    });
  };
  componentDidMount() {
    this.fetchUser();
  }
  componentDidUpdate() {
    this.fetchUser();
  }
  renderAddress = ({ item }, checked) => (
    <PaymentCard
      item={item}
      checked={checked}
      changeSelector={this.changeSelector}
    />
  );
  changeSelector = (selected) => {
    if (this.props.checkout) {
      this.props.onSelectCard(selected);
      Actions.pop();
    }
    this.setState({ checked: selected });
  };
  deleteAddress = async (id) => {
    let renderedCards = [...this.state.cards];
    let cards = renderedCards.filter((value) => value.number !== id);
    const response = await axios.put(USER_URL + this.state.user_id, {
      cards: cards,
    });
    const { data } = response;

    let local = JSON.stringify(data);
    saveUser("user", local);
    this.setState({
      cards: cards,
    });
  };
  openEdit = ({ item }) => {
    this.setState({
      modalVisible: true,
      selectedcard: item,
      title: "Edit Card",
    });
  };


  render() {
    const { cards, checked, modalVisible, selectedcard, title, wallet_balance } = this.state;

    return (
        <Provider>
      <ScrollView contentContainerStyle={styles.container} contentInsetAdjustmentBehavior="automatic">
          {/* <KeyboardAvoidingView behavior="position" enabled> */}
        
          <View
            style={{
              padding: 10,
              backgroundColor: "#fff",
              marginVertical: 8,
              marginHorizontal: 2,
              elevation: 2,
              borderRadius: 4,
              borderColor: "#c9c9c9",
              borderWidth: 0.5,
              marginBottom: 16

            }}
          >
            <View
              style={{
                fontSize: 22,
                alignItems: "center",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              <Image
                source={PIC}
                height={84}
                width={120}
                style={{ height: 124, maxHeight: 164, width: 120 }}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                ${parseFloat(wallet_balance).toFixed(2)}
              </Text>
              <Text
                style={{
                  color: "#226ccf",
                  textDecorationLine: "underline",
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginTop: 12
                }}
                onPress={() => Actions.push("wallet")} >Recharge</Text>
            </View>
          </View>
          <View>
            <SwipeableFlatList
              data={cards}
              contentContainerStyle={{ paddingBottom: 2, marginBottom: 4 }}
              renderItem={(item) => this.renderAddress(item, checked)}
              ListEmptyComponent={() => {
                return <ListEmptyContent />;
              }}
              extraData={this.changeSelector}
              renderRightActions={({ item }) => (
                <SwipeableQuickActions
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SwipeableQuickActionButton
                    style={{
                      backgroundColor: "#ff2244",
                      padding: 8,
                      height: 80,
                    }}
                    textStyle={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#fff",
                      padding: 4,
                    }}
                    onPress={() => {
                      this.deleteAddress(item.number);
                    }}
                    imageSource={Trash}
                    imageStyle={{ height: 20, width: 20, alignSelf: "center" }}
                  />
                </SwipeableQuickActions>
              )}
              keyExtractor={(item) => item.number}
            />
          </View>
          <LinearGradient colors={["#ff9900", "#ff6600"]} style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ modalVisible: true, title: "Add Card" });
              }}
            >
              <Text style={styles.btnText}>ADD NEW Card</Text>
            </TouchableOpacity>
          </LinearGradient>
          {modalVisible && (
            <ManageCard
              modalVisible={modalVisible}
              card={selectedcard}
              title={title}
            />
            
          )}
      {/* </KeyboardAvoidingView> */}
      </ScrollView>
        </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
  card: {
    margin: 4,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#979797",
    borderWidth: 0.5,
    elevation: 4,
    padding: 2,
    marginVertical: 6,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    height: 40,
    borderBottomWidth: 0.2,
    borderBottomColor: "#979797",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 14,
    marginHorizontal: 12,
  },
  headerText: {
    fontSize: 18,
    textTransform: "capitalize",
    padding: 2,
    fontWeight: "bold",
    marginLeft: 4,
  },
  content: {
    fontSize: 14,
    color: "#777",
    paddingRight: 4,
  },
  cardBody: {
    marginHorizontal: 12,
    padding: 4,
    alignItems: "baseline",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#ff6600",
    position: "absolute",
    bottom: 20,
    marginHorizontal: "25%",
    padding: 10,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
    marginLeft: 26,
    textTransform: "uppercase",
  },
});
