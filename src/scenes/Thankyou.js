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
import { styles } from "./styles/CheckoutStyles";
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
        color: "#226cff",
      fontWeight:"bold"
      }}
    >
      Done
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
  <DoneRightButton />;
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
              color: "#226ccf",
            }}
          >
            Thank you for ordering!!!
          </Text>
          <Text style={{ textAlign: "center" }}>
            Do not look into your kitchen, we will provide meals till your
            subscription.
          </Text>
          <Text
            style={{ fontSize: 16, textAlign: "center", fontWeight: "bold" }}
          >
            {state.plan === "twoPlan"
              ? "2"
              : state.plan === "fifteenPlan"
              ? "15"
              : "30"}{" "}
            meals subscription will start from {state.start_date} with reference
            order number {state.order_id}.
          </Text>
          <Text
            style={{ color: "#666", fontWeight: "bold", textAlign: "center" }}
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
