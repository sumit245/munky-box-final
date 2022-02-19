import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";

export default function SearchComponent({ search, setSearch }) {
  const [searching, setSearching] = useState(false);
  const isSearching = () => {
    setSearching(!searching);
    setSearch(searching);
  };
  return (
    <View>
      <TouchableOpacity onPress={isSearching}>
        <Icon name="search" size={24} color="#226cff" />
      </TouchableOpacity>
    </View>
  );
}
