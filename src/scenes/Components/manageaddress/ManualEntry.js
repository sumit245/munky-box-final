import  React,{ Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Chip } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { width } from "../../styles/HomeStyles";

export default class ManualEntry extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props };
  }
  onChangeText = (id) => (e) => {
    const data = { [id]: e };
    this.setState({
      [id]: e,
    });
    this.props.getData(data);
  };
  selectChip = (id) => (e) => {
    let data = {
      address_type: id,
    };
    this.setState({ address_type: id });
    this.props.getData(data);
  };

  render() {
    const { style, address_type } = this.state;
    return (
      <View style={styles.container}>
        <Text style={[styles.headerText,{color:"#4972ff",padding:10,fontWeight:'bold'}]}>Add an Address</Text>
        <Text style={styles.headerText}>Unit / House Number</Text>
        
        {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}> */}
          <TextInput
            onChangeText={this.onChangeText("flat_num")}
            style={styles.inputContainer}
            mode="outlined"
            placeholder="House Number"
            left={
              <TextInput.Icon
                name={() => (
                  <Icon
                    name="home-outline"
                    style={{ marginTop: 4 }}
                    size={18}
                    color="rgba(155,155,155,1)"
                  />
                )}
              />
            }
          />
          {/* <TextInput
            onChangeText={this.onChangeText("state")}
            style={[styles.inputContainer, { width: "48%" }]}
            mode="outlined"
            placeholder="Province"
            left={
              <TextInput.Icon
                name={() => (
                  <Icon
                    name="ios-map-outline"
                    style={{ marginTop: 4 }}
                    size={18}
                    color="rgba(155,155,155,1)"
                  />
                )}
              />
            }
          />
        </View> */}

        <Text style={styles.headerText}>Street Address</Text>
        <TextInput
          onChangeText={this.onChangeText("locality")}
          style={[styles.inputContainer, { marginBottom: 8 }]}
          mode="outlined"
          placeholder="Street Address"
          left={
            <TextInput.Icon
              name={() => (
                <Icon
                  name="ios-map-outline"
                  style={{ marginTop: 4 }}
                  size={18}
                  color="rgba(155,155,155,1)"
                />
              )}
            />
          }
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginVertical: 4,
          }}
        >
          <Text style={styles.headerText}>City</Text>
          <Text style={[styles.headerText, { marginLeft: "42%" }]}>
            Postal Code
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            onChangeText={this.onChangeText("city")}
            style={[styles.inputContainer, { width: "48%" }]}
            mode="outlined"
            placeholder="City"
            left={
              <TextInput.Icon
                name={() => (
                  <Icon
                    name="location-outline"
                    style={{ marginTop: 4 }}
                    size={18}
                    color="rgba(155,155,155,1)"
                  />
                )}
              />
            }
          />
          <TextInput
            onChangeText={this.onChangeText("postal_code")}
            style={[styles.inputContainer, { width: "48%" }]}
            mode="outlined"
            placeholder="Postal Code"
            left={
              <TextInput.Icon
                name={() => (
                  <Icon
                    name="ios-map-outline"
                    style={{ marginTop: 4 }}
                    size={18}
                    color="rgba(155,155,155,1)"
                  />
                )}
              />
            }
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 2,
            marginVertical: 10,
          }}
        >
          <Chip
            icon="home"
            selected={address_type === "home" ? true : false}
            mode="outlined"
            onPress={this.selectChip("home")}
            selectedColor={address_type == "home" ? "#2962ff" : "#000"}
          >
            Home
          </Chip>
          <Chip
            icon="office-building"
            selected={address_type === "work" ? true : false}
            mode="outlined"
            onPress={this.selectChip("work")}
            selectedColor={address_type == "work" ? "#2962ff" : "#000"}
          >
            Work
          </Chip>
          <Chip
            icon="globe-model"
            selected={address_type === "other" ? true : false}
            mode="outlined"
            onPress={this.selectChip("other")}
            selectedColor={address_type == "other" ? "#2962ff" : "#000"}
          >
            Others
          </Chip>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Actions.push("home");
          }}
          // onPress={this._confirmLocation}
        >
          <Text style={styles.confirmLocation}>Save & proceed</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    borderColor: "#FFF",
    shadowOffset: {
      width: -1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "scroll",
    flex: 1,
    width: width,
    marginTop: -20,
    marginHorizontal: 0.2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chips: {
    elevation: 2,
    borderColor: "#777",
  },
  selectAddress: {
    fontSize: 16,
    color: "#000",
    padding: 6,
  },
  inputContainer: {
    backgroundColor: "#fff",
    paddingVertical: 0,
    marginHorizontal: 2,
    height: 40,
    textAlignVertical: "center",
  },
  headerText: {
    fontSize: 16,
    textAlign: "left",
    padding: 2,
  },
  button: {
    width: width - 5,
    borderRadius: 6,
    borderWidth: 0.2,
    marginHorizontal: 2,
    paddingHorizontal: 5,
    height: 45,
    marginTop: 5,
    backgroundColor: "#2962ff",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmLocation: {
    textAlign: "center",
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
    marginLeft: 26,
  },
});
