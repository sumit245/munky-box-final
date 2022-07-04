import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import MenuItem from "./MenuItem";
import { Actions } from "react-native-router-flux";
import PlanChooser from "./PlanChooser";
import Icon from "react-native-vector-icons/Ionicons";
import { avatarSize, styles } from "../../styles/ResultStyles";
import { width } from "../../styles/HomeStyles";
import axios from "axios";
import { TabView, TabBar,SceneMap } from "react-native-tab-view";

export const RenderRightButton = ({ restaurant_id }) => {
  return (
    <View
      style={{
        height: 50,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          Actions.push("documents", { restaurant_id });
        }}
      >
        <Icon
          name="images-outline"
          size={24}
          style={{ margin: 2, marginRight: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};



export default function ResultDetails({ item, promo }) {
  const [index, setIndex] = useState(0);
  const [review, setReview] = useState([]);
  const [routes] = useState([
    { key: "first", title: "Monday" },
    { key: "second", title: "Tuesday" },
    { key: "third", title: "Wednesday" },
    { key: "fourth", title: "Thursday" },
    { key: "fifth", title: "Friday" },
    { key: "sixth", title: "Saturday" },
    { key: "seventh", title: "Sunday" },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      tabStyle={{ width: width / 3 }}
      scrollEnabled
      style={{
        backgroundColor: "transparent",
      }}
      activeColor="#ff6600"
      labelStyle={{ fontWeight: "bold" }}
      inactiveColor="#272727"
      indicatorStyle={{ backgroundColor: "#ff9900", marginHorizontal: 2 }}
    />
  );

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

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
      case "second":
        return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
      case "third":
        return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
      case "fourth":
        return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
      case "fifth":
        return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
      case "sixth":
        return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
      case "seventh":
        return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
      default:
        break;
    }
  };

  const getchefbynameandupdatemenucount = async (restaurant_id) => {
    let MENU_COUNT_URL =
      "http://54.146.133.108:5000/api/chefdashboard/getchefbynameandupdatemenucount/" +
      restaurant_id;
    const response = await axios.get(MENU_COUNT_URL);
  };

  useEffect(() => {
    getchefbynameandupdatemenucount(restaurant_id);
  }, [restaurant_id]);

  const fetchReview = async () => {
    const response = await axios.get(
      "http://54.146.133.108:5000/api/review/"
    );
    const { data } = response;
    let review = data.filter((item) => item.restaurant_id === restaurant_id);
    setReview(review);
  };

  useEffect(() => {
    fetchReview();
  }, []);

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
        onPress={() =>
          Actions.push("reviews", { restaurant_id: restaurant_id })
        }
        style={styles.ratingAndReviews}
      >
        <Icon name="star" color="#ff6600" />
        <Text
          style={{
            marginHorizontal: 2,
            color: "#ff6600",
            fontWeight: "bold",
          }}
        >
          {rating || "5" + "/5 | "}
          <Text style={{ color: "#226ccf", textDecorationLine: "underline" }}>
            {" "}
            Reviews ({review.length || 0})
          </Text>
        </Text>
      </TouchableOpacity>
      
      <View style={{height:300,flex:1}}>
      <TabView
          lazy
          swipeEnabled
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{ width: width }}
        />
      </View>
        


       
      


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
