import { View, Text, Image } from "react-native";
import { styles } from "../../styles/HomeStyles";
import React from "react";

export default function Cuisine({ image, title, highLighted }) {
  return (
    <View style={styles.cuisine}>
      <Image
        source={{ uri: image }}
        style={[
          styles.cuisineContent,
          { borderColor: highLighted ? "#2266cf" : "#fff" },
        ]}
      />
      <Text
        style={[
          styles.cuisine_name,
          { fontWeight: highLighted ? "bold" : "normal" },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}
