import axios from "axios";
import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Chip } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { ADDRESS_URL } from "../../../services/EndPoints";
import { getUser } from "../../../services/user/getuser";
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
  };
  selectChip = (id) => (e) => {
    let data = {
      address_type: id,
    };
    this.setState({ address_type: id });
  };
  _confirmLocation = () => {
    const address = {
      address_type: this.state.address_type,
      city: this.state.city,
      flat_num: this.state.flat_num,
      locality: this.state.locality,
      postal_code: this.state.postal_code,
    };

    getUser("user").then((res) => {
      let id = res.data._id;
      axios
        .put(ADDRESS_URL + id, { address })
        .then((res) => {
          {this.props.entryMethod?Actions.push('home'):Actions.pop({refresh:{}});}
          
        
        })
        .catch((err) => {
          console.log(err);
        });
    });
    //problem inthis block:TODO
  };
  render() {
    const { style, address_type } = this.state;
    return (
      <View style={styles.container}>
        <Text style={[styles.headerText, { color: "#4972ff", padding: 10 }]}>
          Add an Address
        </Text>
        <View style={{ marginTop: 8 }}>
          <Text style={styles.headerText}>Unit / House Number</Text>
          <TextInput
            onChangeText={this.onChangeText("flat_num")}
            style={styles.inputContainer}
            mode="flat"
            placeholder="House Number"
            left={
              <TextInput.Icon
                name={() => (
                  <Icon
                    name="home-outline"
                    size={18}
                    color="rgba(155,155,155,1)"
                  />
                )}
              />
            }
          />
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={styles.headerText}>Street Address</Text>
          <TextInput
            onChangeText={this.onChangeText("locality")}
            style={[styles.inputContainer, { marginBottom: 8 }]}
            mode="flat"
            placeholder="Street Address"
            left={
              <TextInput.Icon
                name={() => (
                  <Icon
                    name="ios-map-outline"
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
            justifyContent: "flex-start",
            marginTop: 8,
          }}
        >
          <Text style={styles.headerText}>City</Text>
          <Text style={[styles.headerText, { marginLeft: "36%" }]}>
            Postal Code
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            onChangeText={this.onChangeText("city")}
            style={[styles.inputContainer, { width: "46%" }]}
            mode="flat"
            placeholder="Ontario"
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
            style={[styles.inputContainer, { width: "46%" }]}
            mode="flat"
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
            marginVertical: 24,
            marginTop: 48,
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
        <View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Actions.push("home");
          }}
          onPress={this._confirmLocation}
          >
          <Text style={styles.confirmLocation}>Save & proceed</Text>
        </TouchableOpacity>
      
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "space-between",
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderColor: "#FFF",
    width: width,
    marginTop: -20,
    marginHorizontal: 0.2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chips: {
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
    marginHorizontal: 8,
    height: 40,
    textAlignVertical: "center",
  },
  headerText: {
    fontSize: 16,
    textAlign: "left",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  button: {
    width: width - 5,
    borderRadius: 6,
    borderWidth: 0.2,
    marginHorizontal: 2,
    // bottom:-10,
    // position:"absolute",
    padding: 6,
    height: 44,
    backgroundColor: "#2962ff",
    alignItems: "center",
    
    justifyContent: "center",
  },
  confirmLocation: {
    textAlign: "center",
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});