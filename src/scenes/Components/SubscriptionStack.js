import React, { useEffect, useState, useRef } from "react";
import { FlatList, SafeAreaView, View, TouchableOpacity } from "react-native";
import axios from "axios";
import { getUser } from "../../services/user/getuser";
import { MY_ORDER_URL } from "../../services/EndPoints";
import Loader from "./utility/Loader";
import Icon from "react-native-vector-icons/Ionicons";
import { width } from "../styles/AuthStyle";
import SubscriptionItem from "./subscriptions/SubscriptionItem";

const convertTime = (giventime) => {
  return giventime.split("-")[0];
};

export default function SubscriptionStack({ navigation }) {
  const [loaded, setLoaded] = useState(false);
  const [myorders, setMyOrders] = useState([]);
  const flatref = useRef(0);
  const [index, setIndex] = useState(0);

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

  const onPressPrevious = (index) => {
    flatref.current.scrollToIndex({ animated: true, index: index - 1 });
  };

  const onPressNext = (index) => {
    flatref.current.scrollToIndex({ animated: true, index: index + 1 });
  };

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
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          horizontal
          pagingEnabled={true}
          legacyImplementation={false}
          showsHorizontalScrollIndicator={false}
          data={myorders}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
        <View
          style={{
            position: "absolute",
            top: "50%",
            elevation: 10,
            zIndex: 1000,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: "2%",
            width: "96%",
          }}
        >
          {index !== 0 ? (
            <TouchableOpacity
              style={{
                height: 36,
                width: 36,
                borderRadius: 18,
                backgroundColor: "#c0c0c0",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={onPressPrevious}
            >
              <Icon name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <TouchableOpacity
            style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              backgroundColor: "#cccccc",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onPressNext}
          >
            <Icon name="chevron-forward" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <Loader msg="Please wait while we are fetching your subscriptions" />
    );
  }
}
