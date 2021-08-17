import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import React, { Component } from 'react'

function MaterialMapView(props) {
    return (
        <View style={[styles.container, props.style]}>
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
