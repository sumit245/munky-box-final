import React, { useState, useEffect } from "react";
import { Router, Scene } from "react-native-router-flux";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import AuthScene from "./scenes/AuthScene";
import HomeScreen from "./scenes/HomeScreen";
import ResultDetails, {
  RenderRightButton,
} from "./scenes/Components/resultdetails/ResultDetails";
import PlanChooser from "./scenes/Components/resultdetails/PlanChooser";
import ReviewScreen from "./scenes/ReviewScreen";
import CheckOut from "./scenes/Components/checkout/CheckOut";
import Rewards from "./scenes/ReviewScreen";
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
import PinComponent from "./scenes/Components/pinlogin/PinComponent"


export default function Routes() {
  const [login, setLogin] = useState(false);
  const [loaded, setLoading] = useState(false)
  const setUser = async () => {
    const res = await getUser("user")
    if (res !== null) {
      setLogin(true)
    }
  }
  useEffect(() => {
    let componentMount = true;
    if (componentMount) {
      setUser()
      setLoading(true)
    }
    return () => {
      componentMount = false
    }
  }, [login])
  if (loaded) {
    return (
      <Router>
        <Scene key="root">
          <Scene key="auth" component={AuthScene} hideNavBar={true} />
          <Scene key="home" component={HomeScreen} hideNavBar={true} initial={login} />
          <Scene key="user_details" component={UserDetail} hideNavBar={true} />
          <Scene key="contacts" component={Contacts} hideNavBar={true} />
          <Scene key="documents" component={ModalOpener} title={"Documents"} renderLeftButton={() => <BackButton />} />
          <Scene key="reviews" component={ReviewScreen} title={"Reviews"} renderLeftButton={() => <BackButton />} />
          <Scene key="thankyou" component={Thankyou} title={"Order Placed"} renderRightButton={DoneRightButton} rightButtonTextStyle={{ marginTop: 20, fontWeight: "bold" }} />
          <Scene key="manageNotifications" component={NotificationStack} hideNavBar={true} />
          <Scene key="editaccount" component={EditAccount} title={"Edit Account"} renderLeftButton={() => <BackButton />} />
          <Scene key="planchooser" component={PlanChooser} />
          <Scene key="user_details" component={UserDetail} hideNavBar={true} />
          <Scene key="contacts" component={Contacts} hideNavBar={true} />
          <Scene key="checkout" component={CheckOut} hideNavBar={true} />
          <Scene key="documents" component={ModalOpener} title={"Documents"} renderLeftButton={() => <BackButton />} />
          <Scene key="reviews" component={ReviewScreen} title={"Reviews"} renderLeftButton={() => <BackButton />} />
          <Scene key="thankyou" component={Thankyou} title={"Order Placed"} renderRightButton={DoneRightButton} />
          <Scene key="planchooser" component={PlanChooser} />
          <Scene key="pinlogin" component={PinComponent} hideNavBar={true} />
          <Scene key="manageCards" component={ListCard} renderLeftButton={() => <BackButton />} />
          <Scene key="manageAddress" component={ManageAddress} hideNavBar={true} />
          <Scene key="listAddress" component={ListAddress} title="Manage Address" renderLeftButton={() => <BackButton />} />
          <Scene key="policies" component={About} title="About" renderLeftButton={() => <BackButton />} />
          <Scene key="coupons" component={Rewards} hideNavBar={true} />
          <Scene key="details" component={ResultDetails} renderLeftButton={() => <BackButton />} renderRightButton={RenderRightButton} />
          <Scene key="favorites" component={Favouite} title="My Favorites" renderLeftButton={() => <BackButton />} />
          <Scene key="wallet" component={Wallet} renderLeftButton={() => <BackButton />} />
          <Scene key="ratings" component={Rate} renderLeftButton={() => <BackButton />} />
          <Scene key="orderDetails" component={OrderDetails} renderLeftButton={() => <BackButton />} renderRightButton={() => <Download />} />
        </Scene>
      </Router>
    );
  } else {
    return <ActivityIndicator size="small" color="#ff9900" />
  }
}
