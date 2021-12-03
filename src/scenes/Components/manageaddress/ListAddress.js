import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";
import { width } from "../../styles/HomeStyles";
import { IconButton, RadioButton } from "react-native-paper";
import { getUser } from "../../../services/user/getuser";
import axios from "axios";
import { USER_URL } from "../../../services/EndPoints";

const ListEmptyContent = () => {
  return (
    <View style={styles.centerContent}>
      <Icon name="sad" size={80} color="#666" />
      <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
        KNOCK KNOCK! WHO'S THERE?
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "#666",
          paddingVertical: 10,
        }}
      >
        You didn't have any addresses saved.{"\n"}
        Saving addresses helps you checkout faster.
      </Text>
    </View>
  );
};

const AddressCard = ({ item, checked, changeSelector }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Icon
          name={
            item.address_type === "home"
              ? "home-outline"
              : item.address_type === "office"
              ? "business-outline"
              : "earth-outline"
          }
          size={24}
          color="#777"
        />
        <Text style={styles.headerText}>{item.address_type}</Text>
      </View>

      <RadioButton.Android
        value={item.address_type}
        status={checked === item.address_type ? "checked" : "unchecked"}
        onPress={() => changeSelector(item.address_type)}
      />
    </View>
    <View style={styles.cardBody}>
      <Text style={styles.content}>{item.flat_num}</Text>
      <Text style={styles.content}>{item.locality}</Text>
      <Text style={styles.content}>{item.city}</Text>
      <Text style={styles.content}>{item.postal_code}</Text>
      <Text style={styles.content}>{item.state}</Text>
    </View>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        marginHorizontal: 12,
      }}
    >
      <IconButton icon="home-edit" size={26} color="#226ccf" />
      <IconButton icon="trash-can-outline" color="#cf226c" />
    </View>
  </View>
);
export default class ListAddress extends Component {
  state = {
    address: [],
    checked: "home",
  };
  componentDidMount() {
    getUser("user").then((res) => {
      let { _id } = res.data;
      axios.get(USER_URL + _id).then((res) => {
        this.setState({ address: res.data.addresses });
      });
    });
  }
  renderAddress = ({ item }, checked) => (
    <AddressCard
      item={item}
      checked={checked}
      changeSelector={this.changeSelector}
    />
  );
  changeSelector = (selected) => {
    if (this.props.checkout) {
      this.props.onAddressSelect(selected);
      Actions.pop();
    }
    this.setState({ checked: selected });
  };
  render() {
    const { address, checked } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={address}
          renderItem={(item) => this.renderAddress(item, checked)}
          ListEmptyComponent={() => {
            return <ListEmptyContent />;
          }}
          extraData={this.changeSelector}
          keyExtractor={(item) => item.address_type}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Actions.push("manageAddress");
          }}
        >
          <Text style={styles.confirmLocation}>ADD NEW ADDRESS</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 4,
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 4,
    padding: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    height: 40,
    borderBottomWidth: 0.2,
    borderBottomColor: "#979797",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 14,
    paddingVertical: 2,
    marginHorizontal: 12,
  },
  headerText: {
    fontSize: 18,
    textTransform: "capitalize",
    padding: 2,
    fontWeight: "bold",
    marginLeft: 4,
  },
  content: {
    fontSize: 14,
    color: "#777",
    paddingRight: 4,
  },
  cardBody: {
    flexDirection: "row",
    marginHorizontal: 12,
    padding: 12,
    alignItems: "baseline",
    borderBottomWidth: 0.2,
    borderBottomColor: "#979797",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 14,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: width - 5,
    borderRadius: 6,
    borderWidth: 0.2,
    marginHorizontal: 2,
    paddingHorizontal: 5,
    height: 45,
    backgroundColor: "#2962ff",
    position: "absolute",
    bottom: 6,
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
