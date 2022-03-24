import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { PaymentIcon } from "react-native-payment-icons";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Fontisto";
import { styles } from "../../styles/CheckoutStyles";

const trimmer = (word) => {
  for (let i = 0; i <= word.length - 5; i++) {
    word = word.replace(word[i], "*");
  }
  return word;
};
export default function CheckoutCards({ cardHandler, user, selected }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      setCards(selected);
      setLoading(false);
    }
    return () => {
      componentMounted = false;
    };
  }, [selected]);

  const _nextAction = () => {
    Actions.push("manageCards", {
      title: "Select Card",
      checkout: true,
      onSelectCard: onSelectCard,
    });
  };

  const onSelectCard = (card) => {
    cardHandler(card);
  };

  try {
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
                borderColor: "#ff6600",
                borderWidth: 0.8,
                marginRight: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PaymentIcon type={
                brand === "master-card"
                  ? "mastercard"
                  : brand
              }
                width={50} />
            </View>
            <View>
              <Text style={styles.optionsLabels}>{trimmer(number)}</Text>
              <Text>{card_holder}</Text>
            </View>
          </View>
          <Button
            mode="text"
            color="#ff6600"
            style={{ marginRight: -20 }}
            onPress={_nextAction}
          >
            change
          </Button>
        </View>
      </View>
    );
  } catch (error) {
    return (
      <TouchableOpacity style={styles.optionCard} onPress={_nextAction}>
        <View style={styles.optionrow}>
          <Text style={styles.optionsLabels}>{"Add a card"}</Text>
          <Icon name="angle-right" color="#ccc" size={16} />
        </View>
      </TouchableOpacity>
    );
  }
}
