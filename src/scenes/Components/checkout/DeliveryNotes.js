import  React,{ Component } from "react";
import { Text, View, TextInput } from "react-native";

export default class DeliveryNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delivery_notes: "",
    };
  }

  onChangeText = (event) => {
    this.setState({ delivery_notes: event });
  };
  render() {
    const { deliveryNotes, options } = this.props;
    const { delivery_notes } = this.state;
    return (
      <View style={[deliveryNotes, { marginHorizontal: 4 }]}>
        <Text
          style={[
            options,
            {
              fontWeight: "bold",
              color: "#333",
              textAlignVertical: "center",
              marginTop: 4,
            },
          ]}
        >
          Add a note
        </Text>
        <TextInput
          style={{
            borderColor: "#ccc",
            padding: 10,
            marginTop: 10,
            borderWidth: 0.5,
            marginBottom: 4,
            fontSize: 16,
            textAlignVertical: "top",
          }}
          placeholder="Place the delivery at door"
          onChangeText={this.onChangeText}
          onEndEditing={() => this.props.noteHandler(delivery_notes)}
        />
      </View>
    );
  }
}
