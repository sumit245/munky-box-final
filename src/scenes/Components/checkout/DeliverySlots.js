import axios from "axios";
import React, { Component } from "react";
import { FlatList } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";
import { RadioButton } from "react-native-paper";
import { width } from "../../styles/AuthStyle";
import { styles } from "../../styles/CheckoutStyles";
// const lunchSlots = [
//   {
//     id: "1",
//     slot: "11:15AM - 12:00PM",
//   },
//   {
//     id: "2",
//     slot: "12:00PM - 12:45PM",
//   },
//   {
//     id: "3",
//     slot: "12:45PM - 1:30PM",
//   },
//   {
//     id: "4",
//     slot: "1:30PM - 2:15PM",
//   },
// ];
// const dinnerSlots = [
//   {
//     id: "1",
//     slot: "7:30PM - 08:15PM",
//   },
//   {
//     id: "2",
//     slot: "8:45PM - 9:30PM",
//   },
//   {
//     id: "3",
//     slot: "9:30PM - 10:15PM",
//   },
//   {
//     id: "4",
//     slot: "10:15PM - 11:00PM",
//   },
// ];

export default class DeliverySlots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      lunchSlots: [],
      value: "",
      dinnerSlots: [],
    };
  }
  async componentDidMount() {
    const response = await axios.get("https://munkybox-admin.herokuapp.com/api/slots");
    const slots = await response.data;
    const lunch = await slots[0].lunchSlots;
    const dinner = await slots[0].dinnerSlots;
    this.setState({
      lunchSlots: lunch,
      dinnerSlots: dinner,
    });
  }

  onSlotChange = (slot, selected) => {
    this.setState((prevS) => ({
      value: selected,
      slot: slot,
    }));

    this.props.slotHandler(slot);
  };
  render() {
    const { category } = this.props;
    const { lunchSlots, dinnerSlots, value } = this.state;
    return (
      <View style={styles.optionCard}>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 2,
            marginBottom: 4,
            paddingVertical: 2,
            alignItems:'flex-start'
          }}
        >
          <Text style={styles.optionsLabels}>Select a delivery slot</Text>
          <Text
            style={{
              fontSize: 12,
              color: "#ff6600",
              fontWeight: "bold",
            }}
          >
            {" "}{this.props.category}
          </Text>
        </View>
        {category === "Lunch"
          ? lunchSlots.map((slot, key) => (
              <RadioButton.Group
                value={value}
                onValueChange={(newValue) => this.onSlotChange(slot, newValue)}
                key={key}
              >
                <Text style={styles.radioLabel}>{slot.slot_name}</Text>
                <View style={styles.radioRow}>
                  <Text>{slot.slot_time}</Text>
                  <RadioButton.Android value={slot.slot_time} color="#ff6600" />
                </View>
              </RadioButton.Group>
            ))
          : dinnerSlots.map((slot, key) => (
              <RadioButton.Group
                value={value}
                onValueChange={(newValue) => this.onSlotChange(slot, newValue)}
                key={key}
              >
                <Text style={styles.radioLabel}>{slot.slot_name}</Text>
                <View style={styles.radioRow}>
                  <Text>{slot.slot_time}</Text>
                  <RadioButton.Android value={slot.slot_time} />
                </View>
              </RadioButton.Group>
            ))}
      </View>
    );
  }
}