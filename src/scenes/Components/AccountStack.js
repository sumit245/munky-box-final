import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Actions } from "react-native-router-flux";
import Icons from "react-native-vector-icons/Ionicons";
import { clearAll, getUser, removeUser } from "../../services/user/getuser";
const { width } = Dimensions.get("screen").width;
export default class AccountStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      user: {},
    };
  }

  componentDidMount() {
    getUser("user")
      .then((res) => this.setState({ user: res.data }))
      .catch((err) => console.log(err));
  }
  logout = () => {
    removeUser("user")
      .then((res) => {
        clearAll().then(alert("Logged out"));
        Actions.jump("auth");
      })
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
      <View style={styles.navdrawer}>
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
          <Icons name="timer-outline" color={"#000"} size={24} brand />
          <TouchableOpacity
            onPress={() => {
              Actions.push("orderhistory");
            }}
          >
            <Text style={styles.drawerText}>My Orders</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerRow}>
          <Icons
            name="ios-cash-outline"
            color={"#000"}
            style={{ fontWeight: "bold" }}
            size={24}
            brand
          />
          <TouchableOpacity
            onPress={() => {
              Actions.push("coupons");
            }}
          >
            <Text style={styles.drawerText}>Add Coupons</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.drawerRow}>
          <Icons name="cog-outline" color={"#000"} size={24} brand />
          <Text style={styles.drawerText}>Settings</Text>
        </View>

        <View style={styles.drawerRow}>
          <Icons
            name="md-document-text-outline"
            color={"#000"}
            size={24}
            brand
          />
          <TouchableOpacity
            onPress={() => {
              Actions.push("policies");
            }}
          >
            <Text style={styles.drawerText}>Support</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.logout}
          style={[
            styles.drawerRow,
            { position: "absolute", bottom: 0, left: 150 },
          ]}
        >
          <Icons name="exit-outline" color={"#000"} size={30} brand />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navdrawer: {
    flex: 1,
    alignSelf: "flex-start",
    alignContent: "flex-start",
    overflow: "scroll",
    width: width,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
    height: 100,
    top: 0,
    elevation: 1,
    padding: 10,
  },
  drawerRow: {
    borderBottomColor: "#888",
    borderBottomWidth: 1,
    borderBottomStartRadius: 100,
    width: 380,
    marginLeft: 2,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 1,
    },
    shadowOpacity: 0.2,
    justifyContent: "flex-start",
    alignItems: "baseline",
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
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      height: -4,
      width: -4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.5,
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
