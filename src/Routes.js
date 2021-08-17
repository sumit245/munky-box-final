import React, { useState } from "react";
import { Actions, Router, Scene } from "react-native-router-flux";
import { View, TouchableOpacity, Text } from "react-native";
import AuthScene from "./scenes/AuthScene";
import HomeScreen from "./scenes/HomeScreen";
import ResultDetails from "./scenes/ResultDetails";
import ReviewScreen from "./scenes/ReviewScreen";
import PlanChooser from "./scenes/PlanChooser";
import AddressPay from "./scenes/AddressPay";
import ChangeAddress from "./scenes/ChangeAddress";
import CheckOut from "./scenes/Components/checkout/CheckOut";
import OrderHistory from "./scenes/Components/OrderHistory";
import Policies from "./scenes/Components/Policies";
import Rewards from "./scenes/ReviewScreen";
import Icon from "react-native-vector-icons/Ionicons";
import UserDetail from "./scenes/Components/UserDetail";
import ManageAddress from "./scenes/Components/manageaddress/ManageAddress";
import ManageCard from "./scenes/Components/managecards/ManageCard";
import { ModalOpener } from "./services/documentopener/documentopener";
import ListAddress from "./scenes/Components/manageaddress/ListAddress";
import { getUser } from "./services/user/getuser";
import EditAccount from "./scenes/Components/EditAccount";
import ListCard from "./scenes/Components/managecards/ListCard";
import NotificationStack from "./scenes/Components/NotificationStack";

export default function Routes() {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);

  getUser("user")
    .then((res) => {
      if (res !== null) {
        setLogin(true);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  return (
    <Router>
      <Scene key="root">
        <Scene key="auth" component={AuthScene} hideNavBar={true} />
        <Scene
          key="home"
          component={HomeScreen}
          hideNavBar={true}
          initial={login}
        />
        <Scene key="userdetails" component={UserDetail} hideNavBar={true} />
        <Scene key="documents" component={ModalOpener} title={"Documents"} />
        <Scene key="reviews" component={ReviewScreen} title={"Reviews"} />
        <Scene
          key="manageNotifications"
          component={NotificationStack}
          hideNavBar={true}
        />
        <Scene
          key="editaccount"
          component={EditAccount}
          title={"Edit Account"}
        />
        <Scene key="planchooser" component={PlanChooser} />
        <Scene key="address" component={AddressPay} hideNavBar={true} />
        <Scene
          key="manageCards"
          component={ListCard}
          renderRightButton={() => (
            <TouchableOpacity
              style={{
                height: 50,
                alignItems: "center",
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
              onPress={() => {
                Actions.documents();
              }}
            >
              <Icon name="wallet-outline" size={24} />
              <View
                style={{
                  height: 14,
                  backgroundColor: "#c62828cc",
                  borderRadius: 7,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                  padding: 4,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#FFF",
                  }}
                >
                  0
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <Scene key="addCard" component={ManageCard} />
        <Scene
          key="manageAddress"
          component={ManageAddress}
          hideNavBar={true}
        />
        <Scene
          key="changeaddress"
          component={ChangeAddress}
          title="Manage Address"
        />
        <Scene
          key="listAddress"
          component={ListAddress}
          title="Manage Address"
        />
        <Scene key="checkout" component={CheckOut} hideNavBar={true} />
        <Scene
          key="orderhistory"
          component={OrderHistory}
          title="Your Orders"
        />
        <Scene key="policies" component={Policies} title="About" />
        <Scene key="coupons" component={Rewards} hideNavBar={true} />
        <Scene
          key="details"
          component={ResultDetails}
          showLabel={false}
          renderRightButton={() => (
            <View
              style={{
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Actions.documents();
                }}
              >
                <Icon
                  name="images-outline"
                  size={24}
                  style={{ margin: 2, marginRight: 5 }}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </Scene>
    </Router>
  );
}
