import React, { Component } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { getUser, saveUser } from "../../../services/user/getuser";
import { USER_URL } from "../../../services/EndPoints";
import { styles } from "../../styles/HomeStyles";

export default class DeliveryOptions extends Component {
  state = {
    modalVisible: false,
    address: "Select address",
    addresses: [],
  };

  setModalVisible = () => {
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));
  };

  setAddress = async (address) => {
    this.setState({ address: address, modalVisible: false });
    let users = await getUser("user");
    let { addresses } = users.data;
    let first = address;
    addresses.sort(function (x, y) {
      return x.address_type == first ? -1 : y.address_type == first ? 1 : 0;
    });
    users.addresses = addresses;
    saveUser("user", JSON.stringify(users));
    this.setState({ addresses: addresses });
  };
  async componentDidMount() {
    const users = await getUser("user");
    const { _id } = users.data;
    const userResponse = await axios.get(USER_URL + _id);
    const { addresses } = await userResponse.data;
    this.setState({ addresses: addresses, address: addresses[0].address_type });
  }
  render() {
    const { modalVisible, addresses } = this.state;
    return (
      <>
        <View style={styles.sortView}>
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={this.setModalVisible}
            onDismiss={this.setModalVisible}
          >
            <TouchableOpacity
              style={styles.sortView}
              activeOpacity={1}
              onPressOut={this.setModalVisible}
            >
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={this.setModalVisible}
                >
                  <Icon name="close-sharp" color="red" size={18} />
                </TouchableOpacity>

                {addresses.map((data, key) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      paddingVertical: 2,
                      borderBottomColor: "#979797",
                      borderBottomWidth: 0.3,
                      borderBottomStartRadius: 30,
                      width: 200,
                    }}
                    key={key}
                    onPress={() => {
                      this.setAddress(data.address_type);
                    }}
                  >
                    <Icon
                      name={
                        data.address_type === "home"
                          ? "ios-home-outline"
                          : data.address_type === "office"
                          ? "business-outline"
                          : "earth-outline"
                      }
                      size={20}
                      style={styles.modalText}
                      color="#979797"
                    />
                    <Text style={styles.modalText}>{data.address_type}</Text>
                  </TouchableOpacity>
                ))}
                {addresses.length <= 3 ? (
                  <Text
                    style={[
                      styles.modalText,
                      { fontWeight: "bold", color: "#226ccf" },
                    ]}
                    onPress={() => {
                      this.setState({ modalVisible: false });
                      Actions.push("listAddress");
                    }}
                  >
                    <Icon name="add-sharp" size={20} color="#226ccf" />
                    Add Address
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          </Modal>
        </View>

        <View>
          <Text onPress={this.setModalVisible}>
            DELIVER TO <Icon name="chevron-down-outline" size={18} />
          </Text>
          <Text
            style={{
              top: -2,
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {this.state.address}
          </Text>
        </View>
      </>
    );
  }
}
