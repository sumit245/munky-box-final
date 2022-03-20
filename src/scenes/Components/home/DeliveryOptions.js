import React, { Component } from "react";
import { View, TouchableOpacity, Text, Modal, ScrollView } from "react-native";
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
    changed:false
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
    users.data.addresses = addresses;
    await saveUser("user", JSON.stringify(users));
    console.log(users);
    this.setState({ addresses: addresses,changed:true });
  };
  async fetchandsave() {
    const users = await getUser("user");
    const { _id } = users.data;
    const userResponse = await axios.get(USER_URL + _id);
    const { addresses } = await userResponse.data;
    this.setState({ addresses: addresses, address: addresses[0].address_type });
  }
  componentDidMount() {
    this.fetchandsave();
  }
  componentDidUpdate(){
    if(this.props.isAdded){
      this.fetchandsave()
    }
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
                <View style={{ flex: 1 }}>
                  <ScrollView
                    style={{ height: 120 }}
                    showsVerticalScrollIndicator={true}
                  >
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
                          size={16}
                          style={styles.modalText}
                          color="#979797"
                        />
                        <View>
                          <Text style={styles.modalText}>
                            {data.address_type}
                          </Text>
                          <Text
                            style={[
                              styles.modalText,
                              { fontSize: 12, fontWeight: "normal" },
                            ]}
                          >
                            {(data.flat_num || "") +
                              "," +
                              (data.locality || "") +
                              " " +
                              (data.city || "")}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <Text
                  style={[
                    styles.modalText,
                    { fontWeight: "bold", color: "#226ccf" },
                  ]}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                    Actions.push("listAddress",{isHome:true});
                  }}
                >
                  <Icon name="add-sharp" size={20} color="#226ccf" />
                  Add Address
                </Text>
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
              top: 2,
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize:16
            }}
          >
            {this.state.address}
          </Text>
        </View>
      </>
    );
  }
}
