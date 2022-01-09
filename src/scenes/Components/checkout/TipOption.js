import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../../styles/CheckoutStyles";

const tipOptions = [
  {
    id: 1,
    option: "1",
  },
  {
    id: 2,
    option: "5",
  },
  {
    id: 3,
    option: "10",
  },
  {
    id: 4,
    option: "Other",
  },
];

export default function TipOption({ tipHandler }) {
  const [isSelected, setIsSelected] = useState(false);
  const [tip, setTip] = useState(false);
  const [tip_amount, setTipAmt] = useState("");

  const selectTip = (tip) => {
    if (tip ==="Other") {
      setTip(true);
      setTipAmt(tip);
    } else {
      setTip(false);
      setTipAmt(tip);
    }
  };
  const handler = (tip) => {
    tipHandler(tip);
    selectTip(tip);
  };

  const renderItem = ({ item }, tip_amount) => {
    return (
      <TouchableOpacity
        style={[
          styles.tipBox,
          {
            backgroundColor: tip_amount === item.option ? "#ff7539cc" : "#FFF",
          },
        ]}
        onPress={() => handler(item.option)}
      >
        <Text
          style={{
            color: tip_amount === item.option ? "#FFF" : "#777",
            padding: 1,
            fontWeight: "bold",
          }}
        >
          {item.id !== 4 && "$"}
          {item.option}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.optionCard}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name="gift-outline" size={24} color="#df7070" />
        <Text
          style={[styles.optionsLabels, { marginHorizontal: 4, fontSize: 16 }]}
        >
          Tip your hunger saviour{" "}
          <Icon name="information-circle-outline" size={14} color="#226ccf" />
        </Text>
      </View>
      <Text style={styles.tipText}>
        Thank your delivery partner for helping you stay safe indoors. Support
        them through these tough times with a tip.
      </Text>
      <FlatList
        horizontal
        contentContainerStyle={{
          margin: 12,
          marginHorizontal: 20,
          alignItems: "center",
        }}
        data={tipOptions}
        renderItem={(item) => renderItem(item, tip_amount)}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectTip}
      />
      {tip && (
        <TextInput
          style={{ backgroundColor: "#fff", marginHorizontal: 20 }}
          value={tip_amount}
          dense
          returnKeyType="done"
          keyboardType="numeric"
          autoFocus={tip}
          onChangeText={(text) => setTipAmt(text)}
          onEndEditing={() => tipHandler(tip_amount)}
        />
      )}
    </View>
  );
}
