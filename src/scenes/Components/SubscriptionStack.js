import React, { useEffect, useState, useRef } from "react";
import { FlatList, View, Text, ScrollView, RefreshControl } from "react-native";
import axios from "axios";
import { getUser } from "../../services/user/getuser";
import { MY_ORDER_URL } from "../../services/EndPoints";
import Loader from "./utility/Loader";
import { height, width } from "../styles/AuthStyle";
import SubscriptionItem from "./subscriptions/SubscriptionItem";

export default function SubscriptionStack({ navigation }) {
  const [loaded, setLoaded] = useState(false);
  const [myorders, setMyOrders] = useState([]);
  const flatref = useRef(null);
  const [currentindex, setCurrentIndex] = useState(0);
  const [cards, setCard] = useState({});
  const [user_id, setUserId] = useState("");

  const getSubscriptions = async () => {
    setLoaded(false)
    const user = await getUser("user");
    const { data } = await user;
    const { user_id, cards } = data;
    const response = await axios.get(MY_ORDER_URL + user_id);
    const myorder = await response.data;
    let subscriptions = myorder.filter((item) => item.status === "started");
    setMyOrders(subscriptions);
    setCard(cards);
    setUserId(user_id);
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
      width={width}
      getCurrentIndex={() => setCurrentIndex(index)}
      navigation={navigation}
      card={cards}
      user_id={user_id}
    />
  );

  const onRefresh = () => { getSubscriptions() }

  const ListEmptyComponent = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          marginTop:height/2,
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
          color: "#000",
          marginHorizontal: width / 10,
        }}
      >
        You don't have any active subscriptions.
      </Text>
    </View>
  );

  if (loaded) {
    return (
      <ScrollView refreshControl={
        <RefreshControl refreshing={!loaded} colors={["#f00", "#0f0", "#00f"]} onRefresh={onRefresh} />
      } >
        <FlatList
          horizontal
          ref={flatref}
          contentContainerStyle={{paddingBottom:10}}
          pagingEnabled={true}
          ListEmptyComponent={ListEmptyComponent}
          showsHorizontalScrollIndicator={false}
          data={myorders}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
    );
  } else {
    return (
      <Loader msg="Please wait while we are fetching your subscriptions" />
    );
  }
}
