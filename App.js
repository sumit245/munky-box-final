import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import Routes from "./src/Routes";

export default class App extends Component {
  componentDidMount() {
    // AsyncStorage.clear()
    AsyncStorage.getItem("user")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  render() {
    return <Routes />;
  }
}
