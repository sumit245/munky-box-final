import React, { useState } from "react";
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
      scrollEnabled
      style={{
        backgroundColor: "transparent",
      }}
      tabStyle={{ width: width / 3.2 }}
      activeColor="#2266ff"
      labelStyle={{ fontWeight: "bold", color: "#000" }}
      inactiveColor="#272727"
      indicatorStyle={{
        backgroundColor: "#2266cf",
        marginHorizontal: 2,
        marginVertical: 4,
      }}
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
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: width - 40 }}
    />
  );
}