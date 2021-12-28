import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import CalenderStrip from "react-native-calendar-strip";
import { styles } from "../styles/subscriptionTabStyle";
import { getUser } from "../../services/user/getuser";
import { MY_ORDER_URL } from "../../services/EndPoints";
import Loader from "./utility/Loader";
import moment from "moment";
import MealList from "./subscriptions/MealList";
import { width } from "../styles/AuthStyle";
import AddOns from "./subscriptions/AddOns";
import SubscriptionItem from "./subscriptions/SubscriptionItem";

const convertTime = (giventime) => {
  return giventime.split("-")[0];
};

export default function SubscriptionStack({ navigation }) {
  const [loaded, setLoaded] = useState(false);
  const [day, setDay] = useState(1);

  const [myorders, setMyOrders] = useState([]);

  const onDateSelected = (date) => {
    var day = moment(date).weekday();
    setDay(day);
  };
  const nextHandler = () => {};
  const getSubscriptions = async () => {
    const user = await getUser("user");
    const { data } = await user;
    const { user_id } = data;
    const response = await axios.get(MY_ORDER_URL + user_id);
    const myorder = await response.data;
    // setState({ ...state, myorder });
    setMyOrders(myorder);
    // const {
    //   start_date,
    //   end_date,
    //   time,
    //   address,
    //   plan,
    //   restaurant,
    //   restaurant_id,
    // } = myorder;
    // const restaurantorders = await axios.get(
    //   "https://munkybox-admin.herokuapp.com/api/newrest/getorders/" +
    //     restaurant_id
    // );
    // const { meals } = await restaurantorders.data;
    // let addOns = [];
    // Array.isArray(meals) &&
    //   meals.map((data, key) => {
    //     let add_on = {
    //       day: data.day,
    //       add_on: data.add_on,
    //     };
    //     addOns.push(add_on);
    //   });
    // let remaining = moment(end_date).diff(moment(start_date), "days");
    // const { address_type, flat_num, locality, city, postal_code } = address;
    // let early = convertTime(time);
    // let skipableTime = early - 3;
    // setState({
    //   ...state,
    //   plan,
    //   restaurant,
    //   start_date,
    //   end_date,
    //   time,
    //   remaining,
    //   address_type,
    //   flat_num,
    //   locality,
    //   city,
    //   postal_code,
    //   meals,
    //   skipableTime: skipableTime,
    // });
    // setExtras(addOns);
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

  if (loaded) {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={myorders}
        renderItem={({ item, index }) => (
          <SubscriptionItem
            item={item}
            index={index}
            nextHandler={nextHandler}
            width={width}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    );
  } else {
    return (
      <Loader msg="Please wait while we are fetching your subscriptions" />
    );
  }
}
