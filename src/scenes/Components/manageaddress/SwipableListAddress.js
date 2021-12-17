import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  SwipeableFlatList,
  SwipeableQuickActionButton,
  SwipeableQuickActions,
} from "react-native-swipe-list";
import { RadioButton, IconButton } from "react-native-paper";

const AddressCard = ({ item, checked, changeSelector }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Icon
          name={
            item.address_type === "home"
              ? "home-outline"
              : item.address_type === "office"
              ? "business-outline"
              : "earth-outline"
          }
          size={24}
          color="#777"
        />
        <Text style={styles.headerText}>{item.address_type}</Text>
      </View>

      {/* <RadioButton.Android
        value={item.address_type}
        status={checked === item.address_type ? "checked" : "unchecked"}
      /> */}
    </View>
    <View style={styles.cardBody}>
      <Text style={styles.content}>{item.flat_num}</Text>
      <Text style={styles.content}>{item.locality}</Text>
      <Text style={styles.content}>{item.city}</Text>
      <Text style={styles.content}>{item.postal_code}</Text>
      <Text style={styles.content}>{item.state}</Text>
    </View>
  </View>
);

export default function SwipableListAddress() {
  const [data, setData] = useState(initialData);
  const renderAddress = ({ item }, checked) => (
    <AddressCard
      item={item}
      checked={checked}
      changeSelector={this.changeSelector}
    />
  );
  changeSelector = (selected) => {
    if (this.props.checkout) {
      this.props.onAddressSelect(selected);
      Actions.pop();
    }
    this.setState({ checked: selected });
  };
  return (
    <SwipeableFlatList
      data={data}
      renderItem={renderAddress}
      keyExtractor={(index) => index.id}
      renderRightActions={({ item }) => (
        <SwipeableQuickActions>
          <SwipeableQuickActionButton onPress={() => {}} text="Edit" />
          <SwipeableQuickActionButton onPress={() => {}} text="Delete" />
          <SwipeableQuickActionButton
            onPress={(item) => changeSelector(item.address_type)}
            text="Select"
          />
        </SwipeableQuickActions>
      )}
    />
  );
}
