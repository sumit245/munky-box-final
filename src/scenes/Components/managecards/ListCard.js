import React, { Component, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import { Actions } from "react-native-router-flux";
import { width } from "../../styles/HomeStyles";
import { IconButton, RadioButton } from "react-native-paper";
import { getUser } from "../../../services/user/getuser";
import ManageCard from "./ManageCard";

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
          <Icon
            name={
              item.brand === "master-card"
                ? "mastercard"
                : item.brand === "diners-club"
                ? "dinners-club"
                : item.brand
            }
            size={20}
            color="#226ccf"
          />
          <Text style={styles.headerText}>{card_number}</Text>
        </View>

        <RadioButton
          value={item.number}
          status={checked === item.number ? "checked" : "unchecked"}
          onPress={() => changeSelector(item.number)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginHorizontal: 12,
          }}
        >
          <Text
            style={{
              color: "#226ccf",
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            Edit / Delete
          </Text>
        </View>
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
  };
  componentDidMount() {
    getUser("user").then((res) => {
      this.setState({ cards: res.data.cards });
    });
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
  render() {
    const { cards, checked } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <FlatList
            data={cards}
            contentContainerStyle={{ paddingBottom: 2 }}
            renderItem={(item) => this.renderAddress(item, checked)}
            ListEmptyComponent={() => {
              return <ListEmptyContent />;
            }}
            extraData={this.changeSelector}
            keyExtractor={(item) => item.number}
          />
        </View>
        <View>
          <ManageCard />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  card: {
    margin: 4,
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 4,
    padding: 2,
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
    borderBottomWidth: 0.2,
    borderBottomColor: "#979797",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 14,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
