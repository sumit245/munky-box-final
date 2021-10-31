import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../../styles/subscriptionTabStyle";
import veg from "../../../../assets/veg.png";
import nonveg from "../../../../assets/nonveg.png";
import { FlatList } from "react-native";
import { width } from "../../styles/AuthStyle";
const Item = ({ meal, index }) => {
  const { image, meal_name, description, type } = meal.item;
  return (
    <View style={{ paddingHorizontal: 2, marginHorizontal: 2, width: width }}>
      <Image
        source={{
          uri: image,
        }}
        style={{ width: width, height: 150 }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Image source={type === "veg" ? veg : nonveg} style={styles.typelogo} />
        <View>
          <Text style={styles.title}>{meal_name}</Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default function MealList({ meals, day }) {
  const flatref = useRef(0);
  const renderItem = (meal, index) => <Item meal={meal} key={index} />;
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      flatref.current.scrollToIndex({ index: meals.length > day ? day : null });
    }
    return () => {
      componentMounted = false;
    };
  }, [day]);
  return (
    <FlatList
      data={meals}
      horizontal
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(meal) => meal.id}
      ref={flatref}
      getItemLayout={(data, index) => ({
        length: width,
        offset: (width + 4) * index,
        index,
      })}
    />
  );
}
