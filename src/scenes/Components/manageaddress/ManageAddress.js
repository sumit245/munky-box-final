import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import MaterialMapView from "./MaterialMapView";
import ManualEntry from "./ManualEntry";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import { USER_URL } from "../../../services/EndPoints";

const { width, height } = Dimensions.get("window");
export default class ManageAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
    };
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <MaterialMapView style={styles.materialMapView}></MaterialMapView>
            <ManualEntry entryMethod={this.props.entryMethod} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  materialMapView: {
    width: width,
    height: width / 1.4,
  },
});
