import React, { useEffect, useState, useRef } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import { getUser } from "../../services/user/getuser";
import { MY_ORDER_URL } from "../../services/EndPoints";
import Loader from "./utility/Loader";
import moment from "moment";
import { width } from "../styles/AuthStyle";
import SubscriptionItem from "./subscriptions/SubscriptionItem";

const convertTime = (giventime) => {
  return giventime.split("-")[0];
};

export default function SubscriptionStack({ navigation }) {
  const [loaded, setLoaded] = useState(false);
  const [myorders, setMyOrders] = useState([]);
  const flatref = useRef(0);

  const nextHandler = () => { };
  
  const getSubscriptions = async () => {
    const user = await getUser("user");
    const { data } = await user;
    const { user_id } = data;
    const response = await axios.get(MY_ORDER_URL + user_id);
    const myorder = await response.data;
    setMyOrders(myorder);
    setLoaded(true);
  };

  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      getSubscriptions();
    }
    return () => {
      componentMounted = false;
    };
  }, []);

  const renderItem = ({ item, index }) => (
    <SubscriptionItem
      item={item}
      index={index}
      nextHandler={nextHandler}
      width={width}
      navigation={navigation}
    />
  );

  if (loaded) {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={myorders}
        ref={flatref}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    );
  } else {
    return (
      <Loader msg="Please wait while we are fetching your subscriptions" />
    );
  }
}
