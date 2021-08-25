import { StyleSheet, View,TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import React, { Component } from 'react'
import  Icon  from "react-native-vector-icons/Ionicons";


function MaterialMapView(props) {
    return (
        <View style={[styles.container, props.style]}>
            <TouchableOpacity
            style={{position:'absolute',left:4,top:8,elevation:2}}
            >

            <Icon name="chevron-back-circle" color="#fcfcfc" size={34}/>
            </TouchableOpacity>
            <MapView style={styles.MapView1}></MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    },
    MapView1: {
        flex:1,
        backgroundColor: "rgb(230,230,230)"
    }
});

export default MaterialMapView;
