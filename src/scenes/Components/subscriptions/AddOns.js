import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { width } from "../../styles/AuthStyle";
import { Actions } from "react-native-router-flux";

export default function AddOns({
  extras,
  hasAddOn,
  meals,
  card,
  user_id,
  placeExtraOrder,
}) {
  const [myaddons, setMyAddOns] = useState([]);
  const [qty, setQty] = useState([]);
  const [subtotal, setSubtotal] = useState([]);
  const [total, setTotal] = useState(0);
  const [pulled, setPulled] = useState(false);
  const [extrass, setExtras] = useState([]);
  const fetchAddOn = () => {
    if (meals !== "undefined" && meals !== null) {
      try {
        const { add_on } = meals;
        setMyAddOns(add_on);
      } catch (error) {
        console.log("No add ons");
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setMyAddOns(extras);
      fetchAddOn();
    }
    return () => {
      mounted = false;
    };
  }, [myaddons]);

  useEffect(() => {
    let subt = [];
    let qties = [];
    for (let i = 0; i < myaddons.length; i++) {
      subt.push(0);
      qties.push(0);
    }
    setSubtotal(subt);
    setQty(qties);
  }, [myaddons]);

  function add(accumulator, a) {
    return parseFloat(accumulator) + parseFloat(a);
  }

  const calculateTotal = (key, qty, rate) => {
    let subt = qty * rate;
    let totls = [...subtotal];
    totls.splice(key, 1, subt);
    let amtTotal = totls.reduce(add, 0);
    setTotal(amtTotal);
    setSubtotal(totls);
  };

  const decrement = (key, rate, item) => {
    if (qty[key] > 0) {
      let qties = [...qty];
      qties.splice(key, 1, qties[key] - 1);
      setQty(qties);
      calculateTotal(key, qties[key], rate);
      const extra = {
        item: item,
        rate: rate,
        qty: qties[key],
        subtotal: parseFloat(rate) * parseInt(qties[key]),
        order_date: moment().format("DD-MMM-YYYY"),
      };
      setExtras([...extrass, extra]);
    }
  };

  const increment = (key, rate, item) => {
    let qties = [...qty];
    qties.splice(key, 1, qties[key] + 1);
    setQty(qties);
    calculateTotal(key, qties[key], rate);
    const extra = {
      item: item,
      rate: rate,
      qty: qties[key],
      subtotal: parseFloat(rate) * parseInt(qties[key]),
      order_date: moment().format("DD-MMM-YYYY"),
    };
    setExtras([...extrass, extra]);
  };

  const orderExtras = () => {
    if (!hasAddOn) {
      const datatoplace = Array.from(new Set(extrass.map((s) => s.item))).map(
        (item) => {
          let singleadds = extrass.filter((s) => s.item === item);
          let quantity = singleadds.reduce((max, addon) =>
            max.qty > addon.qty ? max : addon
          );
          return {
            ...quantity,
          };
        }
      );

      Actions.push("wallet", {
        title: "My Wallet",
        isAddOn: true,
        total: total,
        card: card,
        user_id: user_id,
        action: placeExtraOrder,
        data: datatoplace,
      });
    } else {
      alert("You have already ordered add-ons for the day");
    }
  };

  if (myaddons.length > 0) {
    return (
      <View
        style={{
          marginTop: 8,
          width: width - 40,
          marginHorizontal: 2,
          backgroundColor: "#fcfcfc",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "bold", marginBottom: 4, fontSize: 14 }}>
            Add Extra
          </Text>
          <TouchableOpacity onPress={() => setPulled(!pulled)}>
            <Icon
              name={!pulled ? "chevron-forward" : "chevron-down"}
              color="#ff6600"
              size={24}
            />
          </TouchableOpacity>
        </View>

        {pulled &&
          myaddons.map((data, key) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#fff",
                height: 80,
                borderBottomColor: "#777",
                marginVertical: 2,
                borderBottomWidth: 0.5,
              }}
              key={key}
            >
              <View style={{ width: "30%" }}>
                <Image
                  source={{ uri: data.add_on_image }}
                  style={{ width: 40, height: 40, borderRadius: 4 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                  {data.add_on}
                </Text>
              </View>
              <View style={{ width: "20%" }}>
                <Text style={{ fontSize: 12 }}>
                  {"$" + data.add_on_price + "/-"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "20%",
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
                  onPress={() => decrement(key, data.add_on_price, data.add_on)}
                  disabled={qty[key] === 0}
                />

                <Text style={{ fontWeight: "bold" }}>{qty[key]}</Text>
                <IconButton
                  icon="plus"
                  size={18}
                  style={{
                    borderColor: "#ddd",
                    borderWidth: 0.2,
                    borderRadius: 2,
                  }}
                  onPress={() => increment(key, data.add_on_price, data.add_on)}
                />
              </View>
              <View style={{ width: "20%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  {"$" + subtotal[key]}
                </Text>
              </View>
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
          <TouchableOpacity
            onPress={orderExtras}
            disabled={qty === 0}
            style={{ marginRight: 8 }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#ff6600" }}
            >
              Pay
            </Text>
          </TouchableOpacity>
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
          {pulled && <Text>{"Oops!!! No add ons today"}</Text>}
        </View>
        <TouchableOpacity onPress={() => setPulled(!pulled)}>
          <Icon
            name={!pulled ? "chevron-forward" : "chevron-down"}
            color="#000"
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
