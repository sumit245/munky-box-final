import  React,{ Component } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Modal } from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { getUser } from "../../../services/user/getuser";

export default class DeliveryOptions extends Component {
  state = {
    modalVisible: false,
    address: "Choose Delivery Address",
    addresses: [],
  };

  setModalVisible = () => {
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));
  };
  setAddress = (address) => {
    this.setState({ address: address, modalVisible: false });

  };
  componentDidMount() {
    getUser("user").then((res) => {
      let address = res.data.addresses;
      this.setState({ addresses: address });
    });
  }
  render() {
    const { modalVisible, addresses } = this.state;
    return (
      <>
        <View style={styles.sortView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={this.setModalVisible}
            onDismiss={this.setModalVisible}
          >
            <View style={styles.sortView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={this.setModalVisible}
                >
                  <Icon name="close-outline" size={20} />
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
                {addresses.length < 3 ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      width: 200,
                    }}
                    onPress={()=>{
                      this.setState({modalVisible:false})
                      Actions.push('listAddress')
                    }}
                  >
                    <Icon
                      name="add-sharp"
                      size={20}
                      style={{ fontWeight: "bold", marginTop: 1, padding: 1 }}
                      color="#226ccf"
                    />
                    <Text
                      style={[
                        styles.modalText,
                        { fontWeight: "bold", color: "#226ccf" },
                      ]}
                    >
                      Add Address
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </Modal>
        </View>

        <View>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={this.setModalVisible}
          >
            <Text style={{ fontSize: 16 }}>DELIVER TO</Text>
            <Icon name="chevron-down-outline" size={20} />
          </TouchableOpacity>

          <Text
            style={{
              fontWeight: "bold",
              color: "#979797",
              top: -4,
              textTransform: "capitalize",
            }}
          >
            {this.state.address}
          </Text>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  sortView: {
    flex: 1,
    position: "absolute",
    top: 20,
    width: 220,
    left: 4,
  },
  buttonClose: {
    height: 30,
    width: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    position: "absolute",
    right: -5,
    top: -5,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    padding: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  modalText: {
    padding: 4,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
