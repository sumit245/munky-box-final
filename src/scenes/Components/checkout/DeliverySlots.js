import  React,{ Component } from "react";
import { FlatList } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";
import { width } from "../../styles/AuthStyle";
const lunchSlots = [
  {
    id: "1",
    slot: "11:15AM - 12:00PM",
  },
  {
    id: "2",
    slot: "12:00PM - 12:45PM",
  },
  {
    id: "3",
    slot: "12:45PM - 1:30PM",
  },
  {
    id: "4",
    slot: "1:30PM - 2:15PM",
  },
];
const dinnerSlots = [
  {
    id: "1",
    slot: "7:30PM - 08:15PM",
  },
  {
    id: "2",
    slot: "8:45PM - 9:30PM",
  },
  {
    id: "3",
    slot: "9:30PM - 10:15PM",
  },
  {
    id: "4",
    slot: "10:15PM - 11:00PM",
  },
];

export default class DeliverySlots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
    };
  }

  onSlotChange = (data, selected) => {
    this.setState((prevS) => ({
      selected: selected,
      slot: data,
    }));

    this.props.slotHandler(data);
  };
  render() {
    const { options } = this.props;
    const { selected } = this.state;
    return (
      <>
        <FlatList
          data={this.props.category === "Lunch" ? lunchSlots : dinnerSlots}
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: "row",
                marginVertical: 2,
                marginBottom: 4,
                paddingVertical: 2,
              }}
            >
              <Text
                style={[
                  options,
                  {
                    color: "#333",
                    fontWeight: "bold",
                    paddingLeft: 6,
                    paddingRight: 4,
                  },
                ]}
              >
                Select a delivery slot
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#db7e24",
                  fontWeight: "bold",
                }}
              >
                {this.props.category}
              </Text>
            </View>
          )}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  marginVertical: 2,
                  borderRadius: 2,
                  borderWidth: 0.2,
                  marginHorizontal: 4,
                  width: width / 2.12,
                  alignItems: "center",
                  borderColor: selected === item.id ? "#ff7539" : "#777",
                  backgroundColor: selected === item.id ? "#ff7539cc" : "#FFF",
                }}
                onPress={() => this.onSlotChange(item, item.id)}
              >
                <Text
                  style={[
                    options,
                    { color: selected === item.id ? "#FFF" : "#000" },
                  ]}
                >
                  {item.slot}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </>
    );
  }
}
