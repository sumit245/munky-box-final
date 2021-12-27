import React, { useState } from "react";
import { Actions, Router, Scene } from "react-native-router-flux";
import { View, TouchableOpacity, Text } from "react-native";
import AuthScene from "./scenes/AuthScene";
import HomeScreen from "./scenes/HomeScreen";
import ResultDetails, {
  RenderRightButton,
} from "./scenes/Components/resultdetails/ResultDetails";
import PlanChooser from "./scenes/Components/resultdetails/PlanChooser";
import ReviewScreen from "./scenes/ReviewScreen";
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
import Favouite from "./scenes/Components/Favouite";
import Thankyou, { DoneRightButton } from "./scenes/Thankyou";
import Wallet from "./scenes/Components/wallet/Wallet";
import Contacts from "./scenes/Components/contacts/Contacts";
import BackButton from "./scenes/Components/utility/BackButton";

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
        <Scene key="user_details" component={UserDetail} hideNavBar={true} />
        <Scene key="contacts" component={Contacts} hideNavBar={true} />
        <Scene
          key="documents"
          component={ModalOpener}
          title={"Documents"}
          renderLeftButton={() => <BackButton />}
        />
        <Scene key="reviews" component={ReviewScreen} title={"Reviews"} />
        <Scene
          key="thankyou"
          component={Thankyou}
          title={"Order Placed"}
          renderRightButton={DoneRightButton}
        />
        <Scene
          key="manageNotifications"
          component={NotificationStack}
          hideNavBar={true}
        />
        <Scene
          key="editaccount"
          component={EditAccount}
          title={"Edit Account"}
          renderLeftButton={() => <BackButton />}
        />
        <Scene key="planchooser" component={PlanChooser} />
        <Scene
          key="manageCards"
          component={ListCard}
          renderLeftButton={() => <BackButton />}
          renderRightButton={() => (
            <TouchableOpacity
              style={{
                height: 50,
                alignItems: "center",
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
              onPress={() => {
                Actions.push("wallet");
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
        <Scene
          key="wallet"
          component={Wallet}
          renderLeftButton={() => <BackButton />}
        />
        <Scene key="addCard" component={ManageCard} />
        <Scene
          key="manageAddress"
          component={ManageAddress}
          hideNavBar={true}
        />
        <Scene
          key="listAddress"
          renderLeftButton={() => <BackButton />}
          component={ListAddress}
          title="Manage Address"
        />
        <Scene key="checkout" component={CheckOut} hideNavBar={true} />

        <Scene key="policies" component={Policies} title="About" />
        <Scene key="coupons" component={Rewards} hideNavBar={true} />
        <Scene
          key="details"
          component={ResultDetails}
          renderLeftButton={() => (
            <TouchableOpacity
              style={{
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                Actions.pop();
              }}
            >
              <Icon name="chevron-back" size={28} color="#223fdc" />
            </TouchableOpacity>
          )}
          renderRightButton={RenderRightButton}
        />
        <Scene
          key="favorites"
          component={Favouite}
          title="My Favorites"
          renderLeftButton={() => <BackButton />}
        />
      </Scene>
    </Router>
  );
}
