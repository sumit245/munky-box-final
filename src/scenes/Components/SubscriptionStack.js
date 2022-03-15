import React, { useEffect, useState, useRef } from "react";
import { FlatList, View, Text } from "react-native";
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
  const [card,setCard]=useState({})

  const getSubscriptions = async () => {
    const user = await getUser("user");
    const { data } = await user;
    const { user_id,card } = data;
    const response = await axios.get(MY_ORDER_URL + user_id);
    const myorder = await response.data;
    let subscriptions = myorder.filter((item) => item.status === "started");
    setMyOrders(subscriptions);
    setLoaded(true);
    setCard(card)
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
      width={width}
      getCurrentIndex={() => setCurrentIndex(index)}
      navigation={navigation}
      card={card}
    />
  );

  const ListEmptyComponent = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>You don't have any active subscriptions</Text>
    </View>
  );

  if (loaded) {
    return (
      <>
        <FlatList
          horizontal
          ref={flatref}
          pagingEnabled={true}
          ListEmptyComponent={ListEmptyComponent}
          showsHorizontalScrollIndicator={false}
          data={myorders}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </>
    );
  } else {
    return (
      <Loader msg="Please wait while we are fetching your subscriptions" />
    );
  }
}
