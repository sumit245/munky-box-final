import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { IconButton } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { width } from "../../styles/AuthStyle";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const AddOnComponent = ({ item, index, day, addons }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [addOn, setAddOn] = useState({});
  const [myaddons, setMyAddOns] = useState([]);
  const [qty, setQty] = useState(0);
  useEffect(() => {
    let componentMounted = true;
    if (item.day === days[day]) {
      setSelectedDay(days[day]);
      setMyAddOns(addons);
      setAddOn(item.add_on[0]);
    }
    return () => {
      componentMounted = false;
    };
  }, [day]);
  const { add_on, add_on_price } = addOn;
  const decrement = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };
  const increment = () => {
    setQty(qty + 1);
  };
  if (add_on !== "") {
    return (
      <View
        style={{
          marginTop: 8,
          width: width - 40,
          marginHorizontal: 2,
          backgroundColor: "#fcfcfc",
        }}
        key={index}
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
              <Text style={{ fontSize: 12 }}>
                {"$" + data.add_on_price + "/-"}
              </Text>
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
                onPress={decrement}
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
                onPress={increment}
              />
            </View>

            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              ${parseInt(qty) * parseFloat(data.add_on_price)}
            </Text>
          </View>
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal:4
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
            $0
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
        key={index}
      >
        <View>
          <Text style={{ fontWeight: "bold" }}>Add Extra</Text>
          <Text>{"Oops!!! No add ons today"}</Text>
        </View>
        <Icon name="add-sharp" color="#ddd" size={24} />
      </View>
    );
  }
};
export default function AddOns({ extras, day }) {
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      flatref.current.scrollToIndex({
        index: extras.length > day ? day : null,
      });
    }
    return () => {
      componentMounted = false;
    };
  }, [day]);
  const flatref = useRef(0);
  const renderItem = ({ item, index }) => (
    <AddOnComponent item={item} index={index} day={day} addons={item.add_on} />
  );
  return (
    <FlatList
      data={extras}
      renderItem={renderItem}
      keyExtractor={(item) => item.index}
      horizontal
      showsHorizontalScrollIndicator={false}
      ref={flatref}
      getItemLayout={(data, index) => ({
        length: width,
        offset: (width - 16) * index,
        index,
      })}
    />
  );
}
