import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Fontisto";

const trimmer = (word) => {
  for (let i = 0; i <= word.length - 5; i++) {
    word = word.replace(word[i], "*");
  }
  return word;
};
export default class CheckoutCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: "",
    };
  }

  _nextAction = () => {
    Actions.push("manageCards", {
      title: "Select Card",
      checkout: true,
      onSelectCard: this.onSelectCard,
    });
  };
  onSelectCard = (card) => {
    this.props.cardHandler(card);
    card = trimmer(card);
    this.setState({ card: card });
  };
  render() {
    const { optionrow, options } = this.props;
    const { card } = this.state;
    return (
      <TouchableOpacity
        style={[optionrow, { alignItems: "center" }]}
        onPress={this._nextAction}
      >
        <Text style={options}>{card || "Add a card"}</Text>
        <Icon name="angle-right" color="#ccc" size={16} />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 1,
  },
  buttons: {
    height: 24,
    width: 24,
    padding: 1,
    margin: 2,
    justifyContent: "center",
  },
  hyperlink: {
    color: "#245399",
    textAlign: "right",
    textDecorationStyle: "solid",
  },
});
