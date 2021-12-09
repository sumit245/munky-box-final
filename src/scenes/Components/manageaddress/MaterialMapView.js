import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import MapView from "react-native-maps";
import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {Actions} from "react-native-router-flux";

function MaterialMapView(props) {
  return (
    <View style={[styles.container,props.style]}>
      <MapView style={styles.MapView1}></MapView>
      <TouchableOpacity
        style={{ position: "absolute", left: 8, top:8, elevation: 2 }}
        onPress={()=>Actions.pop()}
      >
        <Icon name="chevron-back" color="#22ccff" size={34} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    
  },
  MapView1: {
  flex:1,
    backgroundColor: "rgb(230,230,230)",
  },
});

export default MaterialMapView;