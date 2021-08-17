import  { View, Text, Image } from "react-native";
import { styles } from "../../styles/HomeStyles";
import React, { Component } from 'react'


export default function Cuisine({ image, title, highLighted }) {
  return (
    <View style={styles.cuisine}>
      <Image
        source={{ uri: image }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          alignSelf: "center",
          borderWidth: 1,
          borderColor: highLighted ? "#2266cf" : "#fff",
        }}
      />
      <Text style={[styles.cuisine_name,{fontWeight:highLighted?"bold":"normal"}]} allowFontScaling>
        {title}
      </Text>
    </View>
  );
}
