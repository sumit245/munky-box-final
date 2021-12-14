import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MenuItem from "./MenuItem";
import { Actions } from "react-native-router-flux";
import PlanChooser from "./PlanChooser";
import Icon from "react-native-vector-icons/Ionicons";
import { avatarSize, styles } from "../../styles/ResultStyles";
import CalenderStrip from "react-native-calendar-strip";
import { width } from "../../styles/HomeStyles";
import moment from "moment";
import axios from "axios";

const renderItem = ({ item, index }) => <MenuItem index={index} meals={item} />;

export default function ResultDetails({ item, promo }) {
  const mealref = useRef(0);
  const {
    meals,
    documents,
    base_2price,
    base_15price,
    base_30price,
    restaurant_name,
    restaurant_id,
    rating,
    meal_type,
    category,
    about,
  } = item;
  const onDateSelected = (date) => {
    const day = moment(date).day();
    mealref.current.scrollToIndex({
      index: meals.length > day ? day : null,
    });
  };
  const getchefbynameandupdatemenucount = async (restaurant_name) => {
    let MENU_COUNT_URL =
      "http://munkybox-admin.herokuapp.com/api/chefdashboard/getchefbynameandupdatemenucount/" +
      restaurant_name;
    const response = await axios.get(MENU_COUNT_URL);
  };

  useEffect(() => {
    getchefbynameandupdatemenucount(restaurant_name);
  }, [restaurant_name]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image
        source={{ uri: documents[1].banner_image }}
        style={styles.headerImage}
      />
      <Image
        source={{ uri: documents[0].restaurant_image }}
        style={styles.avatarImage}
        height={avatarSize}
        width={avatarSize}
      />

      <TouchableOpacity
        onPress={() => Actions.push("reviews")}
        style={styles.ratingAndReviews}
      >
        <Icon name="star" color="#ffa726" />
        <Text
          style={{
            marginHorizontal: 2,
            color: "#ffa726",
            fontWeight: "bold",
          }}
        >
          {rating || "5" + "/5 | "}
          <Text style={{ color: "#000", textDecorationLine: "underline" }}>
            {" "}
            Reviews (0)
          </Text>
        </Text>
      </TouchableOpacity>
      <CalenderStrip
        daySelectionAnimation={{
          type: "background",
          duration: 50,
          highlightColor: "red",
        }}
        dayContainerStyle={{
          height: 40,
          width: 40,
          borderRadius: 4,
        }}
        style={{
          height: 40,
          width: width,
        }}
        responsiveSizingOffset={1}
        shouldAllowFontScaling={false}
        showDayName={true}
        showDayNumber={false}
        startingDate={0}
        selectedDate={Date.now()}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateNameStyle={{
          color: "white",
          fontSize: 14,
          fontWeight: "bold",
        }}
        dateNameStyle={{ fontSize: 12, color: "#000", fontWeight: "bold" }}
        disabledDateNameStyle={{ color: "grey" }}
        showMonth={false}
        scrollable={false}
        leftSelector={[]}
        rightSelector={[]}
        onDateSelected={(date) => onDateSelected(date)}
      />
      <FlatList
        contentContainerStyle={{ marginLeft: 2 }}
        data={meals}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ref={mealref}
      />

      <PlanChooser
        base_2price={base_2price}
        base_15price={base_15price}
        base_30price={base_30price}
        restaurant={restaurant_name}
        restaurant_id={restaurant_id}
        documents={documents}
        meal_type={meal_type}
        category={category}
        promo={promo}
      />
      <Text style={styles.header}>About us </Text>
      <View style={styles.about}>
        <Text style={{ fontSize: 16, textAlign: "justify" }}>{about}</Text>
      </View>
    </ScrollView>
  );
}
