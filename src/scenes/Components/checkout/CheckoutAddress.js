import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";
import { styles } from "../../styles/CheckoutStyles";
import { Button } from "react-native-paper";

export default function CheckoutAddress({ addressHandler, selected }) {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState({});
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      setLoading(true);
      setAddress(selected);
      setLoading(false);
    }
    return () => {
      componentMounted = false;
    };
  }, [selected]);

  const onAddressSelect = async (address) => {
    setLoading(true);
    await addressHandler(address);
    setLoading(false);
  };
  const _nextAction = () => {
    Actions.push("listAddress", {
      title: "Manage Address",
      checkout: true,
      onAddressSelect: onAddressSelect,
    });
  };
  try {
    if (!loading) {
      const { address_type, flat_num, city, locality, postal_code } = address;
      return (
        <View style={styles.optionCard}>
          <View style={styles.optionrow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  borderColor: "#ff6600",
                  borderWidth: 0.8,
                  marginRight: 4,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  name={
                    address_type === "home"
                      ? "home-outline"
                      : address_type === "office"
                      ? "ios-business-outline"
                      : "ios-earth-outline"
                  }
                  size={30}
                  color="#777"
                />
              </View>
              <View>
                <Text style={styles.optionsLabels}>
                  Deliver to{" "}
                  <Text style={{ textTransform: "capitalize" }}>
                    {address_type}
                  </Text>
                </Text>
                <Text>
                  {flat_num}
                  {", "}
                  {locality}
                </Text>
                <Text>
                  {city} -{postal_code}
                </Text>
              </View>
            </View>
            <Button
              mode="text"
              color="#ff6600"
              style={{ marginRight: -20 }}
              onPress={_nextAction}
            >
              change
            </Button>
          </View>
        </View>
      );
    } else {
      return null;
    }
  } catch (error) {
    return (
      <TouchableOpacity style={styles.optionCard} onPress={_nextAction}>
        <View style={styles.optionrow}>
          <Text style={styles.optionsLabels}>{"Add new address"}</Text>
          <Icon name="chevron-forward" color="#ccc" size={24} />
        </View>
      </TouchableOpacity>
    );
  }
}
