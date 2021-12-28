import React, { useState } from "react";
import { View, Text } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { Item } from "./MealList";
import { width } from "../../styles/AuthStyle";

export default function FutureMeals({ meals, futuredays }) {
  const [routes] = useState([
    { key: "first", title: futuredays[0] },
    { key: "second", title: futuredays[1] },
    { key: "third", title: futuredays[2] },
  ]);
  const [index, setIndex] = useState(0);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      tabStyle={{ width: width / 3 }}
      scrollEnabled
      style={{
        backgroundColor: "transparent",
      }}
      activeColor="#2266ff"
      labelStyle={{ fontWeight: "bold",color:"#000" }}
      inactiveColor="#272727"
      indicatorStyle={{ backgroundColor: "#2266cf", marginHorizontal: 2 }}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <Item meal={meals[0]} index={0} />;
      case "second":
        return <Item meal={meals[1]} index={1} />;
      case "third":
        return <Item meal={meals[2]} index={2} />;
      default:
        break;
    }
  };

  return (
    <TabView
      lazy
      swipeEnabled
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
}
