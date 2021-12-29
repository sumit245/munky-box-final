import React, { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { Item } from "./MealList";
import { width } from "../../styles/AuthStyle";

export default function FutureMeals({ meals, futuredays }) {
  const [routes] = useState([
    { key: "first", title: futuredays[0] },
    { key: "second", title: futuredays[1] },
    { key: "third", title: futuredays[2] },
  ]);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
    const renderTabBar = (props) => {
      console.log(props);
        return (
            <TabBar
                {...props}
                scrollEnabled
                style={{
                    backgroundColor: "#fff",
                    width: "100%",
                }}
                renderLabel={({ route, focused, color }) => (
                    <Text style={{ color, margin: 8 }}>
                      {route.title}
                    </Text>
                  )}
                getLabelText={({ route }) => route.title}
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
        )
    }

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
    <View>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}
