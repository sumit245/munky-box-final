import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import WebView from "react-native-webview";

const PDFReader = ({ url: uri }) => <WebView source={{ uri }} />;

export default function About() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: "tnc",
      title: "T&C",
    },
    {
      key: "privacy",
      title: "Privacy",
    },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        marginBottom: 8,
      }}
      tabStyle={{ backgroundColor: "#000" }}
      indicatorStyle={{ backgroundColor: "#dddd44" }}
    />
  );
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "tnc":
        return (
          <PDFReader url="https://feasticom.herokuapp.com/terms-of-service" />
        );
      case "privacy":
        return (
          <PDFReader url="https://feasticom.herokuapp.com/privacy-policy" />
        );
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}
