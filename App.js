import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import Routes from "./src/Routes";

export default function App() {
  return (
    <Routes/>
  )
}

// componentDidMount() {
  //   // AsyncStorage.clear()
  //   AsyncStorage.getItem("user")
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }
  
    // return <Routes />;
