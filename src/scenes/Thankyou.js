import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";
import { ORDER_URL } from "../services/EndPoints";
import { Actions } from "react-native-router-flux";

export const DoneRightButton = () => (
  <TouchableOpacity
    onPress={() => {
      Actions.push("home");
    }}
  >
    <Text
      style={{
        textTransform: "uppercase",
        color: "#FF6600",
        fontWeight: "bold",
        marginRight: 8
      }}
    >
      Done{" "}
    </Text>

  </TouchableOpacity>
);

export default function Thankyou({ id, msg }) {
  const [state, setstate] = useState({
    start_date: "",
    order_id: "",
    plan: "",
  });
  const fetchOrder = async () => {
    const response = await axios.get(ORDER_URL + "/" + id);
    const data = await response.data;
    setstate({ ...data });
  };
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      fetchOrder();
    }
    return () => {
      componentMounted = false;
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={require("../../assets/order_placed.gif")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <View>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              color: "#ff6600",
              lineHeight: 24
            }}
          >
            Thank you for ordering!!!
          </Text>
          <Text style={{ textAlign: "center", lineHeight: 20 }}>
            Do not look into your kitchen, we will provide meals till your
            subscription.
          </Text>
          <Text
            style={{ fontSize: 16, textAlign: "center", fontWeight: "bold", lineHeight: 20, marginTop: 12 }}
          >
            {state.plan === "twoPlan"
              ? "2"
              : state.plan === "fifteenPlan"
                ? "15"
                : "30"}{" "}
            meals subscription will start from
            {"\n" + state.start_date}.
          </Text>
          <Text
            style={{ color: "#777", fontWeight: "bold", textAlign: "center", marginTop: 8 }}
          >
            We have assigned delivery executive to your orders. Your{" "}
            {state.category} will be delivered to you by {state.time} every
            Monday-Sunday
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
