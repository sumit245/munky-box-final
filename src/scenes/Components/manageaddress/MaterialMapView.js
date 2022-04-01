import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import MapView from "react-native-maps";
import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";
import BackButton from "../utility/BackButton";

function MaterialMapView(props) {
  return (
    <View style={[styles.container, props.style]}>
      <MapView style={styles.MapView1} initialRegion={{
        latitude: 43.6532,
        longitude: -79.3832,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }} ></MapView>
      <View
        style={{ position: "absolute", left: 8, top: 8, elevation: 2 }}

      >
        <BackButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",

  },
  MapView1: {
    flex: 1,
    backgroundColor: "rgb(230,230,230)",
  },
});

export default MaterialMapView;