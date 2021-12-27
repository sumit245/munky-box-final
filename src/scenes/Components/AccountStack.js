import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Actions } from "react-native-router-flux";
import Icons from "react-native-vector-icons/Ionicons";
import { clearAll, getUser, removeUser } from "../../services/user/getuser";
import CustomDialog from "./utility/CustomDialog";
const { width } = Dimensions.get("screen").width;
export default class AccountStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      user: {},
      signoff: false,
    };
  }
  fetchUser = () => {
    getUser("user")
      .then((res) => this.setState({ user: res.data }))
      .catch((err) => console.log(err));
  };
  componentDidUpdate(prevProps) {
    this.fetchUser();
  }
  componentDidMount() {
    this.fetchUser();
  }
  logout = () => {
    removeUser("user")
      .then(() => this.setState({ signoff: true }))
      .catch((err) => {
        alert(err);
      });
  };

  render() {
    const data = { ...this.state.user };
    const user =
      typeof data.first_name !== "undefined"
        ? data.first_name + " " + data.last_name
        : "User";
    return (
      <SafeAreaView style={styles.navdrawer}>
        <View style={styles.header}>
          <View style={styles.imageNUmName}>
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: data.profile_picture }}
                style={styles.profilepic}
              />
            </View>
            <View style={{ marginLeft: 10, marginTop: 16 }}>
              <Text style={{ fontSize: 16, color: "#000", fontWeight: "bold" }}>
                {user}
              </Text>
              <TouchableOpacity
                onPress={() => Actions.push("editaccount", { type: "edit" })}
              >
                <Text style={{ color: "#24af9e", fontWeight: "bold" }}>
                  Edit Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.drawerRow}>
          <Icons name="earth" color={"#000"} size={24} brand />
          <TouchableOpacity
            onPress={() => {
              Actions.push("listAddress");
            }}
          >
            <Text style={styles.drawerText}>Manage Address</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.drawerRow}>
          <Icons name="md-card-outline" color={"#000"} size={24} />
          <TouchableOpacity
            onPress={() => {
              Actions.push("manageCards", {
                title: "Manage Payments",
                checkout: false,
              });
            }}
          >
            <Text style={styles.drawerText}>Manage Payments</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.drawerRow}>
          <Icons name="notifications-outline" color={"#000"} size={24} brand />
          <TouchableOpacity
            onPress={() =>
              Actions.push("manageNotifications", {
                title: "Manage Notifications",
              })
            }
          >
            <Text style={styles.drawerText}>Notifications</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.drawerRow}>
          <Icons name="cog-outline" color={"#000"} size={24} brand />
          <Text style={styles.drawerText}>Pin Settings</Text>
        </View>

        <View style={styles.drawerRow}>
          <Icons name="mail-outline" color={"#000"} size={24} brand />
          <TouchableOpacity
            onPress={() => {
              Actions.push("contacts");
            }}
          >
            <Text style={styles.drawerText}>Support</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.drawerRow}>
          <Icons
            name="md-document-text-outline"
            color={"#000"}
            style={{ fontWeight: "bold" }}
            size={24}
            brand
          />
          <TouchableOpacity
            onPress={() => {
              Actions.push("policies");
            }}
          >
            <Text style={styles.drawerText}>About Us</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={this.logout}
          style={[
            styles.drawerRow,
            {
              position: "absolute",
              bottom: 0,
              left: "40%",
              borderBottomColor: "#fff",
            },
          ]}
        >
          <Icons name="exit-outline" color={"#000"} size={30} brand />
        </TouchableOpacity>
        {this.state.signoff && (
          <CustomDialog
            title="Sign Out"
            showDialog={true}
            text="Are you sure you want to logout? This will clear all your data on this device"
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  navdrawer: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    width: width,
    backgroundColor: "#fff",
  },
  header: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    height: 100,
    padding: 10,
  },
  drawerRow: {
    borderBottomColor: "#888",
    borderBottomWidth: 1,
    borderBottomStartRadius: 120,
    borderBottomEndRadius: 40,
    width: width,
    marginLeft: 2,
    flexDirection: "row",
    padding: 14,
    marginVertical: 1,
  },
  drawerText: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  profileContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: "#777",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  profilepic: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  imageNUmName: {
    flex: 1,
    flexDirection: "row",
  },
});
