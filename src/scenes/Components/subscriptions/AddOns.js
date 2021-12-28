import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { IconButton } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { width } from "../../styles/AuthStyle";

export default function AddOns({ extras, day }) {
  const [myaddons, setMyAddOns] = useState([]);
  const [qty, setQty] = useState(0);
  const [subtotal, setSubtotal] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setMyAddOns(extras);
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let arr = [];
    myaddons.map((data, key) => {
      arr.push(key);
    });
  }, [myaddons]);

  const calculateTotal = (key, qty, rate) => {
    let subt = qty * rate;
    let totls = [];
    // totls.setSubtotal(...subtotal, totls);
  };

  const decrement = (key, rate) => {
    if (qty > 0) {
      setQty(qty - 1);
      calculateTotal(key, qty, rate);
    }
  };

  const increment = (key, rate) => {
    setQty(qty + 1);
    calculateTotal(key, qty, rate);
  };
  if (myaddons.length >= 1) {
    return (
      <View
        style={{
          marginTop: 8,
          width: width - 40,
          marginHorizontal: 2,
          backgroundColor: "#fcfcfc",
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 4, fontSize: 14 }}>
          Add Extra
        </Text>
        {myaddons.map((data, key) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              backgroundColor: "#fff",
              height: 80,
              borderBottomColor: "#777",
              marginVertical: 2,
              borderBottomWidth: 0.5,
            }}
            key={key}
          >
            <View>
              <Image
                source={{ uri: data.add_on_image }}
                style={{ width: 40, height: 40, borderRadius: 4 }}
              />
              <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                {data.add_on}
              </Text>
              <Text style={{ fontSize: 12 }}>{"$" + data.add_on_price}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                icon="minus"
                size={18}
                style={{
                  borderColor: "#ddd",
                  borderWidth: 0.2,
                  borderRadius: 2,
                }}
                onPress={() => decrement(key, data.add_on_price)}
                disabled={qty === 0}
              />

              <Text style={{ fontWeight: "bold" }}>{qty}</Text>
              <IconButton
                icon="plus"
                size={18}
                style={{
                  borderColor: "#ddd",
                  borderWidth: 0.2,
                  borderRadius: 2,
                }}
                onPress={() => increment(key, data.add_on_price)}
              />
            </View>

            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {subtotal[key]}
            </Text>
          </View>
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginHorizontal: 4,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#000",
              marginRight: 4,
            }}
          >
            ${total}
          </Text>

          <TouchableOpacity
            onPress={() => Actions.push("wallet", { title: "My Wallet" })}
            disabled={qty === 0}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#226ccf" }}
            >
              Pay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          marginTop: 8,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: width - 20,
          marginHorizontal: 2,
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold" }}>Add Extra</Text>
          <Text>{"Oops!!! No add ons today"}</Text>
        </View>
        <Icon name="add-sharp" color="#ddd" size={24} />
      </View>
    );
  }
}
