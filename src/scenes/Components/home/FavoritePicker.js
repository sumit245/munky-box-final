import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Badge } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { USER_URL } from "../../../services/EndPoints";
import { getUser } from "../../../services/user/getuser";

export default function FavoritePicker() {
  const [count, setCount] = useState("0");
  useEffect(() => {
    let componentMounted = true;
    const getFavoriteCount = async () => {
      const users = await getUser("user");
      const { _id } = await users.data;
      const userResponse = await axios.get(USER_URL + _id);
      const { favorite } = await userResponse.data;
      if (componentMounted) {
        setCount(favorite.length);
      }
    };
    getFavoriteCount();
    return () => {
      componentMounted = false;
    };
  });
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginRight: 8 }}
    >
      <Icon
        name="heart-outline"
        size={26}
        onPress={() => Actions.push("favorites")}
      />
      {count > 0 && (
        <View style={{ marginTop: -6, marginLeft: -10 }}>
          <Badge
            size={16}
            style={{ backgroundColor: "red", fontWeight: "bold" }}
          >
            {count}
          </Badge>
        </View>
      )}
    </View>
  );
}