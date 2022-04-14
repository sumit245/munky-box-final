import React, { useState } from "react";
import { TabBar, TabView } from "react-native-tab-view";
import { Item } from "./MealList";
import { width } from "../../styles/AuthStyle";
import { View } from "react-native";

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
      activeColor="#ff6600"
      labelStyle={{ fontWeight: "bold", color: "#000" }}
      inactiveColor="#272727"
      indicatorStyle={{
        backgroundColor: "#ff9900",
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
    <View style={{ height: 300, flex: 1 }}>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: width - 40 }}
      />
    </View>
  );
}
