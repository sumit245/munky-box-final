import  React, { Component } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, View, TextInput } from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

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

export default class TipOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      tip: false,
      tip_amount: "",
    };
  }
  onValueChange = () => {
    this.setState((prevState) => ({
      isSelected: !prevState.isSelected,
    }));
  };
  onChangeText = (event) => {
    this.setState({ tip_amount: event });
  };
  selectTip = (tip) => {
    if (tip === "Other") {
      this.setState({ tip: true, tip_amount: tip });
    } else {
      this.setState({ tip_amount: tip });
      this.props.tipHandler(tip);
    }
  };

  renderItem = ({ item }, tip_amount) => {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 0.5,
          borderColor: "#df7070",
          padding: 8,
          marginHorizontal: 10,
          borderRadius: 4,
          marginVertical: 4,
          paddingHorizontal: 14,
          backgroundColor: tip_amount === item.option ? "#ff7539cc" : "#FFF",
        }}
        onPress={() => this.selectTip(item.option)}
      >
        <Text
          style={{
            color: tip_amount === item.option ? "#FFF" : "#777",
            padding: 1,
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
            textAlignVertical: "top",
          }}
        >
          {"$"}
          {item.option}
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    const { deliveryNotes, options } = this.props;
    const { isSelected, tip, tip_amount } = this.state;
    return (
      <View style={deliveryNotes}>
        <View>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="gift-outline" size={22} color="#df7070" />
              <Text
                style={[
                  options,
                  {
                    fontWeight: "bold",
                    color: "#333",
                    fontSize: 16,
                    paddingHorizontal: 2,
                  },
                ]}
              >
                Thank you for adding a Tip!
              </Text>
              <Text
                style={{
                  color: "#226ccf",
                  paddingHorizontal: 2,
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                How it works
              </Text>
            </View>
            <Text
              style={{
                marginLeft: 26,
                marginTop: -2,
                color: "#999",
                fontWeight: "bold",
                textAlign: "justify",
                marginRight: 4,
              }}
            >
              Thank you for your generous tip. It'll be passed on to the
              delivery partner immediately
            </Text>
          </View>
          <View style={{ marginLeft: 16, marginVertical: 4 }}>
            <FlatList
              horizontal
              data={tipOptions}
              showsHorizontalScrollIndicator={false}
              renderItem={(item) => this.renderItem(item, tip_amount)}
              keyExtractor={(item) => item.id}
              extraData={this.selectTip}
            />
          </View>
          <TextInput
            style={{
              marginLeft: 24,
              borderBottomColor: "#226ccf",
              borderBottomWidth: 1,
              marginVertical: 4,
              fontSize: 16,
            }}
            placeholder="$5.00"
            value={tip_amount}
            editable={tip}
            returnKeyType='done'
            keyboardType="numeric"
            autoFocus={tip}
            onChangeText={this.onChangeText}
            onEndEditing={() => this.props.tipHandler(tip_amount)}
          />
          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              status={isSelected ? "checked" : "unchecked"}
              onPress={this.onValueChange}
              color={isSelected ? "#df7070" : "#fff"}
            />
            <Text
              style={{
                color: "#999",
                fontWeight: "bold",
                textAlign: "justify",
                marginRight: 4,
              }}
            >
              Add this tip automatically to future orders
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
