import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Badge } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";

export default function FavoritePicker({ favCount }) {
  const [count, setCount] = useState("0");

  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      setCount(favCount);
    }
    return () => {
      componentMounted = false;
    };
  }, [favCount]);
  
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
            style={{ backgroundColor: "#ff6600", fontWeight: "bold",color:"#fff" }}
          >
            {count}
          </Badge>
        </View>
      )}
    </View>
  );
}
