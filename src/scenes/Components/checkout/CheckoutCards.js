import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Fontisto";
import { styles } from "../../styles/CheckoutStyles";

const trimmer = (word) => {
  for (let i = 0; i <= word.length - 5; i++) {
    word = word.replace(word[i], "*");
  }
  return word;
};
export default function CheckoutCards({ cardHandler, user }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      setCards(user.cards[0]);
      console.log(user.cards[0]);
      cardHandler(user.cards[0]);
      setLoading(false);
    }
    return () => {
      componentMounted = false;
    };
  }, []);
  const _nextAction = () => {
    Actions.push("manageCards", {
      title: "Select Card",
      checkout: true,
      onSelectCard: onSelectCard,
    });
  };
  const onSelectCard = (card) => {
    cardHandler(card);
    card = trimmer(card);
    this.setState({ card: card });
  };
  if (loading) {
    return (
      <TouchableOpacity style={styles.optionCard} onPress={_nextAction}>
        <View style={styles.optionrow}>
          <Text style={styles.optionsLabels}>{"Add a card"}</Text>
          <Icon name="angle-right" color="#ccc" size={16} />
        </View>
      </TouchableOpacity>
    );
  } else {
    const { brand, card_holder, number } = cards;
    return (
      <View style={styles.optionCard}>
        <View style={styles.optionrow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 2,
                borderColor: "#777",
                borderWidth: 0.8,
                marginRight: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={brand} size={26} color="#777" />
            </View>
            <View>
              <Text style={styles.optionsLabels}>{trimmer(number)}</Text>
              <Text>{card_holder}</Text>
            </View>
          </View>
          <Button
            mode="text"
            color="orange"
            style={{ marginRight: -20 }}
            onPress={_nextAction}
          >
            change
          </Button>
        </View>
      </View>
    );
  }
}
