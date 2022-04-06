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
import About from "./scenes/About";
import Rate from "./scenes/Components/ratings/Rate";
import OrderDetails from "./scenes/Components/receipt/OrderDetails";
import Download from "./scenes/Components/receipt/Download";
import { LinearGradient } from "expo-linear-gradient";
//import NotificationHandler from "./services/NotificationHandler";

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
        <Scene
          key="reviews"
          component={ReviewScreen}
          title={"Reviews"}
          renderLeftButton={() => <BackButton />}
        />
        <Scene
          key="thankyou"
          component={Thankyou}
          title={"Order Placed"}
          renderRightButton={DoneRightButton}
          rightButtonTextStyle={{ marginTop: 20, fontWeight: "bold" }}
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

        />
        <Scene
          key="wallet"
          title="My Wallet"
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

        <Scene
          key="policies"
          component={About}
          title="About"
          renderLeftButton={() => <BackButton />}
        />
        <Scene key="coupons" component={Rewards} hideNavBar={true} />
        <Scene
          key="details"
          component={ResultDetails}
          renderLeftButton={() => (
            <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
              height: 28,
              width: 28,
              marginHorizontal: 4,
              borderRadius: 14,
            }}>
              <TouchableOpacity
                onPress={() => {
                  Actions.pop();
                }}
              >
                <Icon name="chevron-back-sharp" size={28} color="#ffffff" />
              </TouchableOpacity>
            </LinearGradient>
          )}
          renderRightButton={RenderRightButton}
        />
        <Scene
          key="favorites"
          component={Favouite}
          title="My Favorites"
          renderLeftButton={() => <BackButton />}
        />
        <Scene
          key="ratings"
          component={Rate}
          renderLeftButton={() => <BackButton />}
        />
        <Scene
          key="orderDetails"
          component={OrderDetails}
          renderLeftButton={() => <BackButton />}
          renderRightButton={() => <Download />}
        />
      </Scene>
    </Router>
  );
}
