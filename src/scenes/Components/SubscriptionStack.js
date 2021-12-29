import React, { useEffect, useState, useRef } from "react";
import { Button, FlatList } from "react-native";
import axios from "axios";
import { getUser } from "../../services/user/getuser";
import { MY_ORDER_URL } from "../../services/EndPoints";
import Loader from "./utility/Loader";
import { width } from "../styles/AuthStyle";
import SubscriptionItem from "./subscriptions/SubscriptionItem";

export default function SubscriptionStack({ navigation }) {
  const [loaded, setLoaded] = useState(false);
  const [myorders, setMyOrders] = useState([]);
  const flatref = useRef(null);
  const [currentindex, setCurrentIndex] = useState(0);
  const nextHandler = () => {};

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

  const onPressNext = (index) => {
    if (flatref.current) {
      flatref.current.scrollToIndex({
        index: myorders.length > currentindex ? index++ : index,
      });
      console.log(index);
    }
  };
  const onPrevPress = (index) => {
    if (flatref.current) {
      flatref.current.scrollToIndex({
        index: myorders.length < currentindex ? index-- : index,
      });
      console.log(index);
    }
  };
  const renderItem = ({ item, index }) => (
    <SubscriptionItem
      item={item}
      index={index}
      nextHandler={nextHandler}
      width={width}
      onPressNext={onPressNext}
      onPrevPress={onPrevPress}
      getCurrentIndex={() => setCurrentIndex(index)}
      navigation={navigation}
    />
  );
  const getItemLayout = (data, index) => ({
    length:3,
    width:width,
    offset: 3*index,
    index,
  });

  if (loaded) {
    return (
      <>
        <FlatList
          horizontal
          ref={flatref}
          initialScrollIndex={0}
          pagingEnabled={true}
          legacyImplementation={false}
          showsHorizontalScrollIndicator={false}
          data={myorders}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          getItemLayout={getItemLayout}
        />
        {/* <Button title="Clic" onPress={onButtonPress} /> */}
      </>
    );
  } else {
    return (
      <Loader msg="Please wait while we are fetching your subscriptions" />
    );
  }
}
